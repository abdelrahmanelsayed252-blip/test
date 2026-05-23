'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/context/CartContext';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="raw-theme"
    >
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
