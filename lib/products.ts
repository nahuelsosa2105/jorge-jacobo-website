import { Product, ProductCategory, ProductFilter } from "@/app/types/products";

// Función para obtener productos con filtros y paginación
export async function getProducts(
  filters: ProductFilter = {},
  page: number = 1,
  limit: number = 12,
  sort: string = "newest"
): Promise<{ products: Product[]; total: number; pages: number }> {
  // Simulamos una pequeña demora como lo haría una API real
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filtramos los productos según los criterios
  let filteredProducts = [...products];
  
  // Filtro por categoría
  if (filters.category && filters.category.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      filters.category?.includes(product.category)
    );
  }
  
  // Filtro por marca
  if (filters.brand && filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      filters.brand?.includes(product.brand)
    );
  }
  
  // Filtro por talla
  if (filters.size && filters.size.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.sizes?.some(size => filters.size?.includes(size))
    );
  }
  
  // Filtro por color
  if (filters.color && filters.color.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors?.some(color => filters.color?.includes(color))
    );
  }
  
  // Filtro por precio
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price !== undefined && product.price >= (filters.minPrice || 0)
    );
  }
  
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price !== undefined && product.price <= (filters.maxPrice || Infinity)
    );
  }
  
  // Ordenar productos
  switch (sort) {
    case "newest":
      filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "price-low":
      filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case "price-high":
      filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  
  // Calculamos el total y las páginas
  const total = filteredProducts.length;
  const pages = Math.ceil(total / limit);
  
  // Aplicamos la paginación
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = filteredProducts.slice(start, end);
  
  return {
    products: paginatedProducts,
    total,
    pages
  };
}

// Función para obtener todas las marcas disponibles
export function getAllBrands(): string[] {
  const brands = new Set<string>();
  products.forEach(product => {
    if (product.brand) {
      brands.add(product.brand);
    }
  });
  return Array.from(brands);
}

// Función para obtener todas las tallas disponibles
export function getAllSizes(): string[] {
  const sizes = new Set<string>();
  products.forEach(product => {
    if (product.sizes) {
      product.sizes.forEach(size => sizes.add(size));
    }
  });
  return Array.from(sizes).sort((a, b) => {
    // Ordenar numéricamente si son números
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
  });
}

// Lista de productos de ejemplo
// Lista de productos de ejemplo
export const products: Product[] = [
    {
      id: "1",
      name: "Camisa STD de Trabajo",
      description: "Camisa de trabajo manga larga, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "trabajo",
      brand: "OMBU",
      image: "/images/products/camisa-trabajo-1.jpg",
      images: [
        "/images/products/camisa-trabajo-1.jpg",
        "/images/products/camisa-trabajo-2.jpg",
        "/images/products/camisa-trabajo-3.jpg",
      ],
      price: 15000,
      sizes: ["38", "40", "42", "44", "46"],
      colors: ["Azul", "Gris", "Verde"],  // Opcional, pero recomendado
      features: [                         // Opcional, pero recomendado
        "100% algodón",
        "Doble costura",
        "Bolsillos frontales",
        "Resistente al desgaste"
      ],
      inStock: true,                      // Requerido
      featured: true,                     // Opcional
      createdAt: new Date("2023-01-15")   // Requerido
    }
  ]
   