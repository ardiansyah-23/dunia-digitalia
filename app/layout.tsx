import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dunia Digitalia — Build Your Digital Future',
  description: 'Learn Artificial Intelligence, Web Development, Automation, and Modern Technology in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} dark scroll-smooth`}>
      <body className="bg-[#07111F] text-white antialiased selection:bg-[#1E88FF]/30 selection:text-white">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0F1D35',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.75rem',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
