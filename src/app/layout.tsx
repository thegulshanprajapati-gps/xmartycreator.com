
'use client';

import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { SessionProvider } from '@/components/auth/session-provider';
import { NotificationBanner } from '@/components/layout/notification-banner';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { HelpWidget } from '@/components/help/help-widget';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { PageLoader } from '@/components/layout/page-loader';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});


// This component can't be a server component because of getSession
// But we can wrap it in a client component to get session data
function SessionWrapper({ children }: { children: ReactNode }) {
    // This is a placeholder for how you might fetch session
    // In a real app, you'd fetch this from your auth provider
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // The actual getSession is a server-side utility, so we can't call it here.
    // The logic is now handled by the useSession hook which gets data from context.
    // This setup assumes the initial session state is passed correctly from a server component layer if needed
    // For now, we'll default to false, as the login flow will handle the state.

    return (
        <SessionProvider isLoggedIn={isLoggedIn}>
            {children}
        </SessionProvider>
    );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // When the path changes, start the loader
    setIsLoading(true);

    // Set a timer to hide the loader after a short delay.
    // This gives a visual cue for navigation without being tied to actual data loading.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]); // This effect runs every time the route changes


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Xmarty Creator</title>
        <meta name="description" content="Create and learn with Xmarty" />
      </head>
      <body className={cn("font-body antialiased", ptSans.variable)}>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <NotificationBanner />
              <Header />
              <AnimatePresence mode="wait">
                <motion.main
                  key={pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex-1"
                >
                  {children}
                </motion.main>
              </AnimatePresence>
            </div>
            <Toaster />
            <AnalyticsTracker />
            <HelpWidget />
            <PageLoader isLoading={isLoading} />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
