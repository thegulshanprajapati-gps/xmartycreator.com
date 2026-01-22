
import fs from 'fs/promises';
import path from 'path';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AddAdminForm } from './add-admin-form';
import { User } from 'lucide-react';

type Admin = {
  name: string;
  username: string;
};

async function getAdmins(): Promise<Admin[]> {
  try {
    const adminFilePath = path.join(process.cwd(), 'src/content/admin.json');
    const adminFileContent = await fs.readFile(adminFilePath, 'utf-8');
    const admins = JSON.parse(adminFileContent);
    // Filter out the owner and don't expose passwords to the client
    return admins
        .filter((admin: any) => admin.username !== 'creator')
        .map(({ name, username }: any) => ({ name, username }));
  } catch (error) {
    console.error("Error reading admin credentials:", error);
    return [];
  }
}

export default async function AdminsPage() {
  const admins = await getAdmins();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Admin List</CardTitle>
            <CardDescription>List of all users with admin privileges, managed by the Owner.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.length > 0 ? admins.map((admin) => (
                  <TableRow key={admin.username}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {admin.name}
                    </TableCell>
                    <TableCell>{admin.username}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                      No admins added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <AddAdminForm />
      </div>
    </div>
  );
}
