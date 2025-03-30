export interface Product {
    id: string;
    name: string;
    description: string;
    category: ProductCategory;
    brand: string;
    image: string;
    images?: string[];
    price?: number;
    sizes?: string[];
    colors?: string[];
    features?: string[];
    inStock: boolean;
    featured?: boolean;
    createdAt: Date;
  }
  
  export type ProductCategory = 'calzados' | 'trabajo' | 'campo' | 'seguridad';
  
  export interface ProductFilter {
    category?: ProductCategory[];
    brand?: string[];
    size?: string[];
    color?: string[];
    minPrice?: number;
    maxPrice?: number;
  }