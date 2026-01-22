'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { type Review } from './page';

export async function handleNewReview(reviewData: Omit<Review, 'avatar'>) {
    try {
        const filePath = path.join(process.cwd(), 'src/content/home.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const content = JSON.parse(fileContent);

        const newReview: Review = {
            ...reviewData,
            avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${reviewData.name.replace(/\s/g, '')}`
        };

        content.testimonials.reviews.unshift(newReview); 

        await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');

        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Error saving review:', error);
        return { success: false, error: 'Failed to save review.' };
    }
}
