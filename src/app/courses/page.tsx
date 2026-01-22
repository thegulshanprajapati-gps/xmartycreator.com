
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import coursesContent from '@/content/courses.json';
import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


export default function CoursesPage() {
  const courses = coursesContent.courses.map(course => ({
    ...course,
    image: PlaceHolderImages.find((img) => img.id === course.imageId) || {
      id: course.imageId,
      imageUrl: `https://picsum.photos/seed/${course.imageId}/600/400`,
      description: 'Placeholder image',
      imageHint: 'abstract placeholder'
    }
  }));

  return (
    <>
    <div className="flex flex-col bg-background">
      <section 
        className="w-full py-12 md:py-20 bg-accent/20 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-start text-left max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft}
          >
              <div className="inline-block bg-primary/10 text-primary p-2 rounded-full w-fit mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-destructive dark:text-foreground">
                {coursesContent.hero.title}
              </h1>
              <p className="text-muted-foreground md:text-xl mt-4">
                Your journey to mastery starts here.
              </p>
               <p className="text-muted-foreground md:text-lg mt-2">
                Whether you're starting from scratch or looking to advance your skills, our curated courses provide the knowledge and hands-on experience you need to thrive in the digital world.
              </p>
              <p className="text-muted-foreground md:text-lg mt-2">
                {coursesContent.hero.description}
              </p>
          </motion.div>
        </div>
      </section>

      <motion.section 
        className="w-full pb-20 md:pb-32 pt-20 md:pt-32"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
               <motion.div 
                    key={index} 
                    className="relative group overflow-hidden rounded-xl shadow-lg h-80"
                    variants={cardIn}
                >
                  {course.image && (
                      <Image
                          src={course.image.imageUrl}
                          alt={course.title}
                          data-ai-hint={course.image.imageHint}
                          fill
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:backdrop-blur-sm"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="transform transition-all duration-500 ease-in-out group-hover:-translate-y-24">
                        <h3 className="font-headline text-2xl font-bold text-white ">{course.title}</h3>
                      </div>
                      <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out pt-2">
                          <p className="mb-4 text-sm text-white/90">{course.description}</p>
                          <Button asChild variant="secondary">
                              <Link href="#">Enroll Now</Link>
                          </Button>
                      </div>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
    <Footer />
    </>
  );
}
