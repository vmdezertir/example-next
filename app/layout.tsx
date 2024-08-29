import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { UpButton } from '@/components/up-button';
import { cn } from '@/lib/utils';

import './globals.css';
import Providers from './providers';

const baseFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SportHub',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', baseFont.variable)}>
        <div className="flex h-screen flex-col">
          <Header />
          <Providers>
            <main className="grow">{children}</main>
          </Providers>
          <Footer />
          <UpButton className="fixed bottom-3 right-3" />
        </div>
      </body>
    </html>
  );
}
