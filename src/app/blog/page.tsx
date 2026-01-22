
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import blogContent from '@/content/blog.json';
import { Footer } from '@/components/layout/footer';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

export default function BlogPage() {
  const posts = blogContent.posts.map(post => ({
    ...post,
    image: PlaceHolderImages.find((img) => img.id === post.imageId),
  }));

  return (
    <>
      <div className="flex flex-col">
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <Newspaper className="h-12 w-12 text-destructive dark:text-foreground" />
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-destructive dark:text-foreground">
                {blogContent.hero.title}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                {blogContent.hero.description}
              </p>
            </motion.div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Card key={index} className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-destructive">
                  {post.image && (
                    <div className="h-48 w-full relative">
                      <Image
                        src={post.image.imageUrl}
                        alt={post.title}
                        data-ai-hint={post.image.imageHint}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline">{post.title}</CardTitle>
                    <CardDescription className="h-12">{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
