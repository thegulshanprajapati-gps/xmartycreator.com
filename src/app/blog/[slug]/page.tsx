
import Image from 'next/image';
import { notFound } from 'next/navigation';
import blogContent from '@/content/blog.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Footer } from '@/components/layout/footer';
import { Calendar, User, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Post = (typeof blogContent.posts)[0] & { image?: (typeof PlaceHolderImages)[0] };

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const postData = blogContent.posts.find(p => p.slug === params.slug);

  if (!postData) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === postData.imageId);
  const post: Post = { ...postData, image };

  return (
    <>
      <div className="flex flex-col bg-background text-foreground">
        <article className="container mx-auto px-4 py-12 md:px-6 md:py-20 max-w-4xl">
          {/* Header Image */}
          {post.image && (
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={post.image.imageUrl}
                alt={post.title}
                data-ai-hint={post.image.imageHint}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}

          {/* Title and Meta */}
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-destructive dark:text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Xmarty Creator Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>May 25, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
                       prose-headings:font-headline prose-headings:text-destructive dark:prose-headings:text-foreground
                       prose-p:text-foreground
                       prose-a:text-primary hover:prose-a:text-primary/80"
          >
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
