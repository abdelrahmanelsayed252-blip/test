import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAW — Wear The Uncommon',
  description:
    'RAW is a minimalist Egyptian streetwear brand, born in 2021. Wear The Uncommon.',
  metadataBase: new URL('https://raw-eg.example')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
