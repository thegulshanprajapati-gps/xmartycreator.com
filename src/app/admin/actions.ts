
'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

type Admin = {
  name: string;
  username: string;
  password?: string;
};

const adminFilePath = path.join(process.cwd(), 'src/content/admin.json');

async function getAdmins(): Promise<Admin[]> {
  try {
    const adminFileContent = await fs.readFile(adminFilePath, 'utf-8');
    return JSON.parse(adminFileContent);
  } catch (error) {
    console.error("Error reading admin credentials:", error);
    // If file doesn't exist or is corrupted, return a default admin
    return [{ name: 'Default Admin', username: 'admin', password: 'password' }];
  }
}

async function saveAdmins(admins: Admin[]) {
  await fs.writeFile(adminFilePath, JSON.stringify(admins, null, 2), 'utf-8');
}


export async function login(prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const session = await getSession();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const admins = await getAdmins();
  const admin = admins.find(a => a.username === username);

  if (!admin || admin.password !== password) {
    return { error: 'Invalid username or password.' };
  }

  session.isLoggedIn = true;
  session.username = admin.username;
  await session.save();

  redirect('/admin/dashboard');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}

export async function addAdmin(prevState: { message: string }, formData: FormData) {
    const session = await getSession();
    if (!session.isLoggedIn) {
        return { message: 'Error: You are not authorized.' };
    }

    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!name || !username || !password) {
        return { message: 'Error: All fields are required.' };
    }

    try {
        const admins = await getAdmins();

        if (admins.some(a => a.username === username)) {
            return { message: 'Error: This username already exists.' };
        }

        const newAdmin: Admin = { name, username, password };
        const updatedAdmins = [...admins, newAdmin];

        await saveAdmins(updatedAdmins);

        revalidatePath('/admin/dashboard/admins');
        return { message: `Success: Admin "${name}" has been added.` };
    } catch (error: any) {
        console.error("Failed to add admin:", error);
        return { message: `Error: Could not add admin. ${error.message}` };
    }
}
