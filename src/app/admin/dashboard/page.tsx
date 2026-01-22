
import fs from 'fs/promises';
import path from 'path';
import AdminDashboardClient from './admin-dashboard-client';

// Define the type for the home content
type HomeContent = {
  hero: {
    title: string;
    description: string;
    buttons: {
      primary: { text: string; link: string };
      secondary: { text: string; link: string };
    };
  };
  featuredCourses: {
    title: string;
    description: string;
    courses: { title: string; description: string; imageId: string }[];
  };
  whyChooseUs: {
    title: string;
    description: string;
    features: { title: string; description: string }[];
  };
  testimonials: {
    title: string;
    description: string;
    reviews: {
      name: string;
      role: string;
      testimonial: string;
      rating: number;
      avatar: string;
    }[];
  };
};

// Function to read content from the JSON file
async function getHomeContent(): Promise<HomeContent> {
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


export default async function AdminDashboard() {
  const homeContent = await getHomeContent();
  return <AdminDashboardClient initialHomeContent={homeContent} />;
}
