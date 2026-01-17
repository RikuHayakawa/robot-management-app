import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BaseLayout } from '@/components/common/BaseLayout';
import ClientProvider from '@/components/provider/ClientProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Robot Management App',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider>
          <BaseLayout>{children}</BaseLayout>
        </ClientProvider>
      </body>
    </html>
  );
}
