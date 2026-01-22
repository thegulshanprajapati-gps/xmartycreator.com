
'use client';

import { Users, Target, Eye, Linkedin, Twitter, Instagram, Youtube, Zap, Lightbulb, Heart, Rocket } from 'lucide-react';
import aboutContent from '@/content/about.json';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { motion } from 'framer-motion';

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

export default function AboutPage() {

  const founder = aboutContent.founder;
  const heroImage = PlaceHolderImages.find(img => img.id === aboutContent.hero.imageId);
  const valueIcons = [
    <Zap className="h-8 w-8 text-primary" />,
    <Lightbulb className="h-8 w-8 text-primary" />,
    <Heart className="h-8 w-8 text-primary" />,
    <Rocket className="h-8 w-8 text-primary" />
  ];

  return (
    <>
      <div className="flex flex-col bg-background text-foreground">
        
        {/* Hero Section */}
        <section className="w-full bg-accent/20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center py-20 md:py-32">
                    <motion.div 
                      className="flex flex-col justify-center space-y-4"
                      initial="hidden"
                      animate="visible"
                      variants={slideInFromLeft}
                    >
                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-destructive dark:text-foreground">
                            {aboutContent.hero.title}
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            {aboutContent.hero.description}
                        </p>
                    </motion.div>
                    {heroImage && (
                        <motion.div
                          className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl"
                          initial="hidden"
                          animate="visible"
                          variants={slideInFromRight}
                        >
                             <Image
                                src={heroImage.imageUrl}
                                alt={heroImage.description}
                                data-ai-hint={heroImage.imageHint}
                                fill
                                className="object-cover transition-all duration-300 hover:scale-105"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>

        {/* Core Values Section */}
        <motion.section 
          className="w-full py-24 md:py-32 bg-accent/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{aboutContent.values.title}</h2>
                    <p className="max-w-[900px] mx-auto mt-4 text-muted-foreground md:text-xl">
                        {aboutContent.values.description}
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {aboutContent.values.items.map((value, index) => (
                        <div key={index} className="text-center p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:bg-card">
                            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                                {valueIcons[index]}
                            </div>
                            <h3 className="font-headline text-xl font-bold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>

        {/* Meet the Founder Section */}
        <section className="w-full py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  className="text-center mb-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                >
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{aboutContent.founder.title}</h2>
                    <p className="max-w-[900px] mx-auto mt-4 text-muted-foreground md:text-xl">
                        {aboutContent.founder.description}
                    </p>
                </motion.div>

                <div className="group relative flex justify-center">
                    <Card className="w-full max-w-4xl overflow-hidden shadow-lg border-border transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
                       <div className="absolute inset-0 w-full h-full bg-transparent group-hover:shimmer"></div>
                        <div className="grid md:grid-cols-3 items-center">
                            <motion.div
                              className="md:col-span-1 p-8 bg-muted/40 h-full flex flex-col items-center justify-center text-center"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.5 }}
                              variants={slideInFromLeft}
                            >
                                <Avatar className="w-40 h-40 mb-4 border-4 border-primary/20 shadow-lg">
                                    <AvatarFallback className="text-6xl font-bold bg-primary text-primary-foreground">
                                    {founder.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-headline text-3xl">{founder.name}</CardTitle>
                                <p className="text-primary font-semibold text-lg">{founder.role}</p>
                            </motion.div>
                            <motion.div
                              className="md:col-span-2 p-8"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.5 }}
                              variants={slideInFromRight}
                            >
                                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                    {founder.bio}
                                </p>
                                {founder.socials && (
                                <div className="flex justify-start gap-6">
                                    {founder.socials.linkedin && (
                                        <a href={founder.socials.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Linkedin className="h-7 w-7" />
                                        </a>
                                    )}
                                    {founder.socials.twitter && (
                                        <a href={founder.socials.twitter} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Twitter className="h-7 w-7" />
                                        </a>
                                    )}
                                    {founder.socials.instagram && (
                                        <a href={founder.socials.instagram} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Instagram className="h-7 w-7" />
                                        </a>
                                    )}

                                    {founder.socials.youtube && (
                                        <a href={founder.socials.youtube} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Youtube className="h-7 w-7" />
                                        </a>
                                    )}
                                </div>
                                )}
                            </motion.div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
