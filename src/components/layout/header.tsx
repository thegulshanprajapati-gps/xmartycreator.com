
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { SearchDialog, type SearchableItem } from '../search-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import coursesContent from '@/content/courses.json';
import { useSession } from '../auth/session-provider';
import { logout } from '@/app/admin/actions';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const courses = coursesContent.courses.map(course => ({
  ...course,
  image: PlaceHolderImages.find((img) => img.id === course.imageId)
}));


const searchableCourses: SearchableItem[] = courses.map(course => ({
  href: '/courses',
  label: course.title,
  description: 'Course',
}));

const searchableItems: SearchableItem[] = [...navLinks, ...searchableCourses];


export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useSession();
  const { toast } = useToast();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
    });
  };

  useEffect(() => {
    const unauthorized = searchParams.get('unauthorized');
    if (unauthorized === 'true') {
        toast({
            title: 'Unauthorized',
            description: 'You must be logged in as an admin to view that page. Please log in.',
            variant: 'destructive',
        });
        // Clean up the URL by replacing the history state
        setTimeout(() => {
            const newPath = pathname;
            router.replace(newPath, { scroll: false });
        }, 100);
    }
  }, [searchParams, toast, pathname, router]);


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo/1000010559.png" alt="Xmarty Creator Logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-bold sm:inline-block font-headline text-lg">
              Xmarty Creator
            </span>
          </Link>
          
          {/* Desktop Navigation */}
           <nav className="hidden md:flex flex-1 items-center justify-center text-sm font-medium">
             <ul className="flex items-center gap-2">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} className="relative">
                    <Link
                      href={href}
                      prefetch={true}
                      className={cn(
                        "relative block rounded-full px-4 py-2 transition z-10",
                        isActive ? "text-primary-foreground" : "text-foreground/60 hover:text-primary"
                      )}
                    >
                      {label}
                    </Link>
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 rounded-full bg-destructive z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
             </ul>
           </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Dialog open={showSearch} onOpenChange={setShowSearch}>
              <SearchDialog searchableItems={searchableItems} onSelect={() => setShowSearch(false)} />
            </Dialog>
            {isLoggedIn && (
                <div className="hidden md:flex items-center gap-2">
                  <Button asChild>
                      <Link href="/admin/dashboard">Dashboard</Link>
                  </Button>
                  <form action={handleLogout}>
                    <Button variant="outline" type="submit">Logout</Button>
                  </form>
                </div>
            )}
            
            {/* Mobile Navigation Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                    <Image src="/logo/1000010559.png" alt="Xmarty Creator Logo" width={32} height={32} />
                    <span className="font-bold font-headline text-lg">Xmarty Creator</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        prefetch={true}
                        onClick={closeMobileMenu}
                        className={cn(
                          "text-lg transition-colors hover:text-primary",
                          pathname === href ? "text-primary font-semibold" : "text-foreground/80"
                        )}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                   <div className="mt-4">
                     <Button variant="outline" className="w-full" onClick={() => { closeMobileMenu(); setShowSearch(true); }}>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                   </div>
                   {isLoggedIn && (
                     <div className="flex flex-col gap-4 mt-4">
                       <Button asChild className="w-full" onClick={closeMobileMenu}>
                         <Link href="/admin/dashboard">Dashboard</Link>
                       </Button>
                       <form action={handleLogout}>
                          <Button variant="outline" className="w-full" type="submit" onClick={closeMobileMenu}>Logout</Button>
                       </form>
                     </div>
                   )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
