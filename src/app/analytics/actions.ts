
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const analyticsFilePath = path.join(process.cwd(), 'src/content/analytics.json');

// A simple lock mechanism to prevent race conditions.
// In a real high-traffic app, a proper database or a more robust locking library would be needed.
let isWriting = false;

async function readAnalyticsData() {
  try {
    const fileContent = await fs.readFile(analyticsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist or is empty, return a default structure.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { pageViews: {}, linkClicks: {} };
    }
    console.error("Error reading analytics file:", error);
    // In case of other errors (e.g., JSON parsing), return a safe default.
    return { pageViews: {}, linkClicks: {} };
  }
}

async function writeAnalyticsData(data: any) {
  if (isWriting) {
    // If a write is already in progress, skip this one to avoid corruption.
    // This is a simple way to handle concurrency.
    return;
  }
  
  isWriting = true;
  try {
    await fs.writeFile(analyticsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing analytics file:", error);
  } finally {
    isWriting = false;
  }
}

export async function trackPageView(pathname: string) {
    if (pathname.startsWith('/admin')) {
        // Do not track admin page views
        return;
    }

  const data = await readAnalyticsData();
  
  data.pageViews[pathname] = (data.pageViews[pathname] || 0) + 1;
  
  await writeAnalyticsData(data);

  revalidatePath('/admin/dashboard/analytics');
}

export async function trackLinkClick(linkName: string) {
  const data = await readAnalyticsData();
  
  data.linkClicks[linkName] = (data.linkClicks[linkName] || 0) + 1;

  await writeAnalyticsData(data);

  revalidatePath('/admin/dashboard/analytics');
}
