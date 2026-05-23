export type Locale = 'en' | 'ar';

export type LocalizedString = { en: string; ar: string };

export type SizeStock = { size: string; stock: number };

export type Product = {
  id: string;
  slug: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  price: number;
  color: string;
  colorHex: string;
  tags: string[];
  sizes: SizeStock[];
  images: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
};
