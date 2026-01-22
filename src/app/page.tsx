
import fs from 'fs/promises';
import path from 'path';
import HomePageClient from './home-page-client';

async function getHomeContent() {
  const filePath = path.join(process.cwd(), 'src/content/home.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to read home.json:", error);
    // Return a default structure if the file is missing or corrupted
    return {
      hero: { title: '', description: '', buttons: { primary: { text: '', link: '' }, secondary: { text: '', link: '' }}},
      featuredCourses: { title: '', description: '', courses: [] },
      whyChooseUs: { title: '', description: '', features: [] },
      testimonials: { title: '', description: '', reviews: [] },
    };
  }
}

export default async function Home() {
  const homeContent = await getHomeContent();
  return <HomePageClient initialHomeContent={homeContent} />;
}
