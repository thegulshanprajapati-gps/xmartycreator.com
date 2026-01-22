
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { ImagePlaceholder } from '@/lib/placeholder-images';


function getFeaturesFromFormData(formData: FormData) {
    const features = [];
    let index = 0;
    while (formData.has(`feature-title-${index}`)) {
        features.push({
            title: formData.get(`feature-title-${index}`) as string,
            description: formData.get(`feature-desc-${index}`) as string,
        });
        index++;
    }
    return features;
}

function getReviewsFromFormData(formData: FormData) {
    const reviews = [];
    let index = 0;
    while (formData.has(`review-name-${index}`)) {
        reviews.push({
            name: formData.get(`review-name-${index}`) as string,
            role: formData.get(`review-role-${index}`) as string,
            testimonial: formData.get(`review-text-${index}`) as string,
            rating: Number(formData.get(`review-rating-${index}`)),
            avatar: formData.get(`review-avatar-${index}`) as string,
        });
        index++;
    }
    return reviews;
}

function getValuesFromFormData(formData: FormData) {
    const values = [];
    let index = 0;
    while (formData.has(`value-title-${index}`)) {
        values.push({
            title: formData.get(`value-title-${index}`) as string,
            description: formData.get(`value-description-${index}`) as string,
        });
        index++;
    }
    return values;
}

function getParagraphsFromFormData(formData: FormData) {
    const paragraphs = [];
    let index = 0;
    while (formData.has(`story-paragraph-${index}`)) {
        paragraphs.push(formData.get(`story-paragraph-${index}`) as string);
        index++;
    }
    return paragraphs;
}

function getCoursesFromFormData(formData: FormData) {
    const courses = [];
    let index = 0;
    while (formData.has(`course-title-${index}`)) {
        const title = formData.get(`course-title-${index}`) as string;
        // Only add course if title is not empty
        if (title) {
            courses.push({
                title: title,
                description: formData.get(`course-description-${index}`) as string,
                imageId: formData.get(`course-imageId-${index}`) as string,
            });
        }
        index++;
    }
    return courses;
}

function getFeaturedCoursesFromFormData(formData: FormData) {
    const courses = [];
    let index = 0;
    while (formData.has(`featured-course-title-${index}`)) {
        const title = formData.get(`featured-course-title-${index}`) as string;
        if (title) {
            courses.push({
                title: title,
                description: formData.get(`featured-course-description-${index}`) as string,
                imageId: formData.get(`featured-course-imageId-${index}`) as string,
            });
        }
        index++;
    }
    return courses;
}

function getBlogPostsFromFormData(formData: FormData) {
    const posts = [];
    let index = 0;
    while(formData.has(`post-title-${index}`)) {
        const title = formData.get(`post-title-${index}`) as string;
        const slug = formData.get(`post-slug-${index}`) as string;
        if (title && slug) {
            posts.push({
                title: title,
                slug: slug,
                description: formData.get(`post-description-${index}`) as string,
                imageId: formData.get(`post-imageId-${index}`) as string,
                link: `/blog/${slug}`,
                content: formData.get(`post-content-${index}`) as string,
            });
        }
        index++;
    }
    return posts;
}


export async function updateHomeContent(prevState: { message: string, data: any }, formData: FormData) {
    try {
        const newContent = {
            hero: {
                title: formData.get('hero-title') as string,
                description: formData.get('hero-description') as string,
                buttons: {
                    primary: {
                        text: formData.get('hero-primary-btn-text') as string,
                        link: formData.get('hero-primary-btn-link') as string,
                    },
                    secondary: {
                        text: formData.get('hero-secondary-btn-text') as string,
                        link: formData.get('hero-secondary-btn-link') as string,
                    },
                },
            },
            featuredCourses: {
                title: formData.get('featured-courses-title') as string,
                description: formData.get('featured-courses-description') as string,
                courses: getFeaturedCoursesFromFormData(formData),
            },
            whyChooseUs: {
                title: formData.get('why-title') as string,
                description: formData.get('why-description') as string,
                features: getFeaturesFromFormData(formData),
            },
            testimonials: {
                title: formData.get('testimonials-title') as string,
                description: formData.get('testimonials-description') as string,
                reviews: getReviewsFromFormData(formData),
            },
        };

        const filePath = path.join(process.cwd(), 'src/content/home.json');
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), 'utf-8');

        revalidatePath('/');
        revalidatePath('/admin/dashboard');

        return { message: 'Home page content updated successfully!', data: newContent };
    } catch (error: any) {
        console.error(error);
        return { message: `Failed to update home page content: ${error.message}`, data: prevState.data };
    }
}


export async function updateAboutContent(prevState: { message: string, data: any }, formData: FormData) {
    try {
        const newContent = {
            hero: {
                title: formData.get('hero-title') as string,
                description: formData.get('hero-description') as string,
                imageId: formData.get('hero-imageId') as string,
            },
            story: {
                title: formData.get('story-title') as string,
                paragraphs: getParagraphsFromFormData(formData),
            },
            values: {
                title: formData.get('values-title') as string,
                description: formData.get('values-description') as string,
                items: getValuesFromFormData(formData),
            },
            founder: {
                title: formData.get('founder-title') as string,
                description: formData.get('founder-description') as string,
                name: formData.get('founder-name') as string,
                role: formData.get('founder-role') as string,
                bio: formData.get('founder-bio') as string,
                socials: {
                    linkedin: formData.get('founder-socials-linkedin') as string,
                    twitter: formData.get('founder-socials-twitter') as string,
                    instagram: formData.get('founder-socials-instagram') as string,
                    youtube: formData.get('founder-socials-youtube') as string,
                }
            },
        };

        const filePath = path.join(process.cwd(), 'src/content/about.json');
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), 'utf-8');

        revalidatePath('/about');
        revalidatePath('/admin/dashboard/about');

        return { message: 'About page content updated successfully!', data: newContent };
    } catch (error: any) {
        console.error(error);
        return { message: `Failed to update about page content: ${error.message}`, data: prevState.data };
    }
}

export async function updateNotificationContent(prevState: { message: string, data: any }, formData: FormData) {
    try {
        const newContent = {
            enabled: formData.get('enabled') === 'on',
            message: formData.get('message') as string,
            linkText: formData.get('linkText') as string,
            linkHref: formData.get('linkHref') as string,
        };

        const filePath = path.join(process.cwd(), 'src/content/notification.json');
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), 'utf-8');

        revalidatePath('layout'); // Revalidate all pages using the layout

        return { message: 'Notification banner updated successfully!', data: newContent };
    } catch (error: any) {
        console.error(error);
        return { message: `Failed to update notification banner: ${error.message}`, data: prevState.data };
    }
}


export async function updateCoursesContent(prevState: { message: string, data: any }, formData: FormData) {
    try {
        const newContent = {
            hero: {
                title: formData.get('hero-title') as string,
                description: formData.get('hero-description') as string,
            },
            courses: getCoursesFromFormData(formData),
        };

        const filePath = path.join(process.cwd(), 'src/content/courses.json');
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), 'utf-8');

        revalidatePath('/courses');
        revalidatePath('/admin/dashboard/courses');

        return { message: 'Courses page content updated successfully!', data: newContent };
    } catch (error: any) {
        console.error(error);
        return { message: `Failed to update courses page content: ${error.message}`, data: prevState.data };
    }
}


export async function updateBlogContent(prevState: { message: string, data: any }, formData: FormData) {
    try {
        const newContent = {
            hero: {
                title: formData.get('hero-title') as string,
                description: formData.get('hero-description') as string,
            },
            posts: getBlogPostsFromFormData(formData),
        };

        const filePath = path.join(process.cwd(), 'src/content/blog.json');
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), 'utf-8');

        revalidatePath('/blog');
        revalidatePath('/admin/dashboard/blog');

        return { message: 'Blog page content updated successfully!', data: newContent };
    } catch (error: any) {
        console.error(error);
        return { message: `Failed to update blog page content: ${error.message}`, data: prevState.data };
    }
}


export async function addImageToGallery(prevState: { message: string }, formData: FormData) {
    const id = formData.get('id') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const description = formData.get('description') as string;
    const imageHint = formData.get('imageHint') as string;

    if (!id || !imageUrl || !description) {
        return { message: 'Error: ID, Image URL, and Description are required.' };
    }

    const filePath = path.join(process.cwd(), 'src/lib/placeholder-images.json');

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        if (data.placeholderImages.some((image: ImagePlaceholder) => image.id === id)) {
            return { message: 'Error: An image with this ID already exists.' };
        }

        const newImage: ImagePlaceholder = {
            id,
            imageUrl,
            description,
            imageHint: imageHint || 'custom image'
        };

        data.placeholderImages.push(newImage);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        revalidatePath('/admin/dashboard/gallery');
        return { message: 'Success: Image added to the gallery!' };
    } catch (error: any) {
        console.error('Failed to add image:', error);
        return { message: `Error: Could not add image. ${error.message}` };
    }
}

export async function deleteImageFromGallery(imageId: string) {
    if (!imageId) {
        return { success: false, message: 'Error: Image ID is required.' };
    }

    const filePath = path.join(process.cwd(), 'src/lib/placeholder-images.json');

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        const initialLength = data.placeholderImages.length;
        const updatedImages = data.placeholderImages.filter((image: ImagePlaceholder) => image.id !== imageId);

        if (updatedImages.length === initialLength) {
            return { success: false, message: `Error: Image with ID "${imageId}" not found.` };
        }

        data.placeholderImages = updatedImages;

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

        revalidatePath('/admin/dashboard/gallery');
        return { success: true, message: `Success: Image "${imageId}" has been deleted.` };
    } catch (error: any) {
        console.error('Failed to delete image:', error);
        return { success: false, message: `Error: Could not delete image. ${error.message}` };
    }
}
