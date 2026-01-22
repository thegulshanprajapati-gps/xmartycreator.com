
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Submission {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const submissionsFilePath = path.join(process.cwd(), 'src/content/contact-submissions.json');

async function getSubmissions(): Promise<Submission[]> {
    try {
        await fs.access(submissionsFilePath);
        const fileContent = await fs.readFile(submissionsFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist, return an empty array.
        return [];
    }
}

export async function handleContactSubmission(prevState: any, formData: FormData) {
    const newSubmission: Submission = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        submittedAt: new Date().toISOString(),
    };

    if (!newSubmission.name || !newSubmission.email || !newSubmission.subject || !newSubmission.message) {
        return { success: false, message: 'Please fill out all fields.' };
    }

    try {
        const submissions = await getSubmissions();
        submissions.unshift(newSubmission); // Add new submission to the beginning

        await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2), 'utf-8');

        // Revalidate paths to show new data
        revalidatePath('/contact');
        revalidatePath('/admin/dashboard/contact');

        return { success: true, message: 'Your message has been sent successfully!' };
    } catch (error: any) {
        console.error('Error saving contact submission:', error);
        return { success: false, message: 'Failed to send message. Please try again later.' };
    }
}
