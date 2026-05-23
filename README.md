# RAW — Wear The Uncommon

A premium e-commerce website for **RAW**, an Egyptian minimalist streetwear brand established in 2021.

> *Wear The Uncommon — البس المختلف*

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with custom brand theme
- **Framer Motion** for editorial transitions
- **next-themes** for light/dark mode
- **next-intl** for English/Arabic with full RTL
- **React Context** for cart state, persisted in `localStorage`

## Pages

- `/[locale]` — Editorial hero, featured, new drop, story, Instagram grid
- `/[locale]/shop` — Filterable product grid (color, size, price, sort)
- `/[locale]/shop/[slug]` — Sticky gallery + info, tabs, related products
- `/[locale]/cart` — Dedicated cart page (drawer also available everywhere)
- `/[locale]/checkout` — Multi-step (Info → Shipping → Payment → Review)
- `/[locale]/order-confirmed`
- `/[locale]/about`

## Brand

- Blue `#004AAD` · Off-white `#EDECE8` · Black `#000000`
- **Montserrat** for English (Light → Black)
- **GE SS Two Medium** for Arabic

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build
```

## Data

Products live in `/data/products.json`. Images are in `/public/images/products`.
