import type { Product, ProductCategory, ProductFilter } from "@/app/types/products"

// Función para obtener productos por categoría con filtros y paginación
export async function getProductsByCategory(
  category: ProductCategory,
  page = 1,
  limit = 12,
  filters: Record<string, any> = {},
): Promise<{ products: Product[]; total: number; pages: number }> {
  // Simulamos una pequeña demora como lo haría una API real
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Filtramos los productos según la categoría
  let filteredProducts = products.filter((product) => product.category === category)

  // Aplicamos los filtros adicionales
  if (filters.brand) {
    filteredProducts = filteredProducts.filter((product) => filters.brand.includes(product.brand))
  }

  if (filters.sizes) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.sizes) return false
      return product.sizes.some((size) => filters.sizes.includes(size))
    })
  }

  // Calculamos el total y las páginas
  const total = filteredProducts.length
  const pages = Math.ceil(total / limit)

  // Aplicamos la paginación
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = filteredProducts.slice(start, end)

  return {
    products: paginatedProducts,
    total,
    pages,
  }
}

// Función para obtener productos con filtros y paginación
export async function getProducts(
  filters: ProductFilter = {},
  page = 1,
  limit = 12,
  sort = "newest",
): Promise<{ products: Product[]; total: number; pages: number }> {
  // Simulamos una pequeña demora como lo haría una API real
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Filtramos los productos según los criterios
  let filteredProducts = [...products]

  // Filtro por categoría
  if (filters.category && filters.category.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.category?.includes(product.category))
  }

  // Filtro por marca
  if (filters.brand && filters.brand.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.brand?.includes(product.brand))
  }

  // Filtro por talla
  if (filters.size && filters.size.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.sizes?.some((size) => filters.size?.includes(size)))
  }

  // Filtro por color
  if (filters.color && filters.color.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.colors?.some((color) => filters.color?.includes(color)),
    )
  }

  // Filtro por precio
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price !== undefined && product.price >= (filters.minPrice || 0),
    )
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price !== undefined && product.price <= (filters.maxPrice || Number.POSITIVE_INFINITY),
    )
  }

  // Ordenar productos
  switch (sort) {
    case "newest":
      filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case "price-low":
      filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0))
      break
    case "price-high":
      filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0))
      break
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  // Calculamos el total y las páginas
  const total = filteredProducts.length
  const pages = Math.ceil(total / limit)

  // Aplicamos la paginación
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = filteredProducts.slice(start, end)

  return {
    products: paginatedProducts,
    total,
    pages,
  }
}

// Función para obtener un producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simulamos una pequeña demora como lo haría una API real
  await new Promise((resolve) => setTimeout(resolve, 200))

  const product = products.find((p) => p.id === id)
  return product || null
}

// Función para obtener productos destacados
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  // Simulamos una pequeña demora como lo haría una API real
  await new Promise((resolve) => setTimeout(resolve, 200))

  return products.filter((product) => product.featured).slice(0, limit)
}

// Función para obtener todas las marcas disponibles
export function getAllBrands(): string[] {
  const brands = new Set<string>()
  products.forEach((product) => {
    if (product.brand) {
      brands.add(product.brand)
    }
  })
  return Array.from(brands)
}

// Función para obtener todas las tallas disponibles
export function getAllSizes(): string[] {
  const sizes = new Set<string>()
  products.forEach((product) => {
    if (product.sizes) {
      product.sizes.forEach((size) => sizes.add(size))
    }
  })
  return Array.from(sizes).sort((a, b) => {
    // Ordenar numéricamente si son números
    const numA = Number.parseInt(a)
    const numB = Number.parseInt(b)
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB
    }
    return a.localeCompare(b)
  })
}

// Función para obtener todos los colores disponibles
export function getAllColors(): string[] {
  const colors = new Set<string>()
  products.forEach((product) => {
    if (product.colors) {
      product.colors.forEach((color) => colors.add(color))
    }
  })
  return Array.from(colors)
}

// Aquí puedes agregar tus productos
// Esta es una lista de ejemplo que puedes reemplazar con tus productos reales
const products: Product[] = [
    {
      id: "1",
      name: "Camisa Ombu Blanca",
      description: "Camisa de trabajo manga larga, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "trabajo",
      brand: "OMBU",
      image: "/Productos/O-CM13 BLANCO.webp",
      images: [
        // "/Productos/_MG_9377.webp",
        // "/Productos/camisa con sticker antiolor.webp",
        // "/images/products/camisa-trabajo-3.jpg",
      ],
      price: 15000,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blanco"],  // Opcional, pero recomendado
      features: [                         // Opcional, pero recomendado
        "100% algodón",
        "Doble costura",
        "Bolsillos frontales",
        "Resistente al desgaste"
      ],
      inStock: true,                      // Requerido
      featured: true,                     // Opcional
      createdAt: new Date("2023-01-15")   // Requerido
    },
    {
      id: "2",
      name: "Camisa de Trabajo sticker Antiolor",
      description: "Camisa de trabajo manga larga, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "trabajo",
      brand: "OMBU",
      image: "/Productos/camisa con sticker antiolor.webp",
      images: [
        // "/Productos/_MG_9377.webp",
        // "/Productos/camisa con sticker antiolor.webp",
        // "/images/products/camisa-trabajo-3.jpg",
      ],
      price: 15000,
      sizes: ["S", "M", "L", "XL", "XXL"],
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
    },
    {
      id: "3",
      name: "Chomba Ombu de Piqué Verde",
      description: "Chomba, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "campo",
      brand: "OMBU",
      image: "/Productos/O-CH03 VERDE VARIANTE copy.webp",
      images: [
        
      ],
      price: 15000,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [ "Verde"],  
      features: [                         
        "100% algodón",
        "Doble costura",
        "Bolsillos frontales",
        "Resistente al desgaste"
      ],
      inStock: true,                      
      featured: true,                     
      createdAt: new Date("2023-01-15")   
    },
    {
      id: "4",
      name: "Pantalón Cargo Verde con Bolsillo Porta Celular OMBU ",
      description: "Pantalón, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "trabajo",
      brand: "OMBU",
      image: "/Productos/_MG_9377.webp",
      images: [
        
      ],
      price: 15000,
      sizes: ["38", "40", "42", "44", "46", "48", "50"],
      colors: [ "Verde"],  
      features: [                         
        "100% algodón",
        "Doble costura",
        "Bolsillos laterales",
        "Resistente al desgaste"
      ],
      inStock: true,                      
      featured: true,                     
      createdAt: new Date("2023-01-15")   
    },
    {
      id: "5",
      name: "Bombacha de Campo Beige ",
      description: "Bombacha de campo, confeccionada en tela de algodón 100%, resistente al desgaste.",
      category: "campo",
      brand: "OMBU",
      image: "/Productos/OBCA01P BEIGE copy.webp",
      images: [
        
      ],
      price: 15000,
      sizes: ["38", "40", "42", "44", "46", "48", "50"],
      colors: [ "Beige"],  
      features: [                         
        "Doble costura",
        "Resistente al desgaste"
      ],
      inStock: true,                      
      featured: true,                     
      createdAt: new Date("2023-01-15")   
    },
    {
    id: "6",
    name: "Bombacha de Campo Verde",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OBCD03 VERDE copy.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46", "48", "50"],
    colors: ["Verde"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "7",
    name: "Bombacha de Campo Frisa Beige",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OBCF01P BEIGE copy - copia.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46", "48", "50"],
    colors: ["Beige"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  // Se puede agregar produco con id 8 en este lugar.
  {
    id: "9",
    name: "Bermuda Cargo de Gabardina",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OBMC03S BEIGE copy.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46", "48", "50"],
    colors: ["Beige"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "10",
    name: "Bermuda de Gabardina",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OBMC03S VERDE copy.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46", "48", "50"],
    colors: ["Verde"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "11",
    name: "Camisa Ombu Beige",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OCA03 BEIGE copy.webp",
    images: [],
    price: 15000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "12",
    name: "Camisa Ombu Azul Marino",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OCA04 AZUL copy.webp",
    images: [],
    price: 15000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Azul Marino"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "13",
    name: "Campera Polar Verde",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OCM01CA VERD copy.webp",
    images: [],
    price: 15000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Verde"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "14",
    name: "Mameluco de Trabajo Verde",
    description: "",
    category: "campo",
    brand: "OMBU",
    image: "/Productos/OMAR01 VERDE copy.webp",
    images: [],
    price: 15000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Verde"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "15",
    name: "Pantalón Ombu Azulino",
    description: "",
    category: "trabajo",
    brand: "OMBU",
    image: "/Productos/OPA08 AZULINO copy.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Azul"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "16",
    name: "Pantalón Ombu Blanco",
    description: "",
    category: "trabajo",
    brand: "OMBU",
    image: "/Productos/OPA08 BLANCO copy.webp",
    images: [],
    price: 15000,
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Blanco"],
    features: [],
    inStock: true,
    featured: false,
    createdAt: new Date("2023-01-15")
  }
]

// Exportamos la lista de productos para uso directo si es necesario
export { products }

