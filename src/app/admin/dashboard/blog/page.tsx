
'use client';

import { Button } from '@/components/ui/button';
import initialBlogContent from '@/content/blog.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useState } from 'react';
import { updateBlogContent } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Post = {
    title: string;
    slug: string;
    description: string;
    imageId: string;
    content: string;
};

type BlogContent = {
    hero: {
        title: string;
        description: string;
    };
    posts: Post[];
};

export default function AdminBlogPage() {
    const [state, formAction, isPending] = useActionState(updateBlogContent, { message: '', data: initialBlogContent });
    const { toast } = useToast();
    const [blogContent, setBlogContent] = useState<BlogContent>(initialBlogContent);

    useEffect(() => {
        if (state?.message) {
            toast({
                title: state.message.includes('Failed') ? 'Error!' : 'Success!',
                description: state.message,
                variant: state.message.includes('Failed') ? 'destructive' : 'default',
            });
        }
        if(state?.data) {
            setBlogContent(state.data as BlogContent);
        }
    }, [state, toast]);

    const handleAddPost = () => {
        const newPost: Post = { title: '', slug: '', description: '', imageId: '', content: '' };
        setBlogContent(prev => ({
            ...prev,
            posts: [...prev.posts, newPost]
        }));
    };
    
    const handleRemovePost = (indexToRemove: number) => {
        setBlogContent(prev => ({
            ...prev,
            posts: prev.posts.filter((_, index) => index !== indexToRemove)
        }));
    };

  return (
    <form action={formAction}>
        <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-lg font-semibold md:text-2xl">Blog Page Management</h1>
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleAddPost}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Post
                </Button>
                <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save All Changes'}</Button>
            </div>
        </div>
        
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Blog Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="hero-title">Title</Label>
                    <Input id="hero-title" name="hero-title" defaultValue={blogContent.hero.title} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea id="hero-description" name="hero-description" defaultValue={blogContent.hero.description} />
                </div>
            </CardContent>
        </Card>

        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                 {blogContent.posts.map((post, index) => (
                    <Card key={index} className="relative">
                        <CardHeader>
                            <CardTitle>Post #{index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor={`post-title-${index}`}>Title</Label>
                                <Input id={`post-title-${index}`} name={`post-title-${index}`} defaultValue={post.title} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`post-slug-${index}`}>Slug</Label>
                                <Input id={`post-slug-${index}`} name={`post-slug-${index}`} defaultValue={post.slug} />
                                <p className="text-xs text-muted-foreground">The URL part for this post (e.g., my-first-post).</p>
                            </div>
                             <div className="space-y-2 mt-2">
                                <Label htmlFor={`post-description-${index}`}>Short Description</Label>
                                <Textarea id={`post-description-${index}`} name={`post-description-${index}`} defaultValue={post.description} />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`post-content-${index}`}>Full Content (Markdown supported)</Label>
                                <Textarea id={`post-content-${index}`} name={`post-content-${index}`} defaultValue={post.content} className="min-h-48" />
                            </div>
                            <div className="space-y-2 mt-2">
                                <Label htmlFor={`post-imageId-${index}`}>Image ID</Label>
                                <Input id={`post-imageId-${index}`} name={`post-imageId-${index}`} defaultValue={post.imageId} />
                                <p className="text-xs text-muted-foreground">
                                    Copy ID from the <a href="/admin/dashboard/gallery" className="text-primary underline">Image Gallery</a>.
                                </p>
                            </div>
                        </CardContent>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-destructive hover:text-destructive">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently remove the post. This action cannot be undone. You must click "Save All Changes" to finalize the deletion.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemovePost(index)} className="bg-destructive hover:bg-destructive/90">
                                    Yes, remove it
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                ))}
            </div>
             {blogContent.posts.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-12 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <h3 className="text-2xl font-bold tracking-tight">No Posts Found</h3>
                        <p className="text-sm text-muted-foreground">Click "Add New Post" to get started.</p>
                    </div>
                </div>
            )}
        </div>
    </form>
  );
}
