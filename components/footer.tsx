import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-semibold">PRODUCTOS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/productos/calzado" className="text-sm text-muted-foreground hover:text-primary">
                CALZADO
              </Link>
            </li>
            <li>
              <Link href="/productos/trabajo" className="text-sm text-muted-foreground hover:text-primary">
                TRABAJO
              </Link>
            </li>
            <li>
              <Link href="/productos/accesorios" className="text-sm text-muted-foreground hover:text-primary">
                ACCESORIOS
              </Link>
            </li>
            <li>
              <Link href="/productos/seguridad" className="text-sm text-muted-foreground hover:text-primary">
                SEGURIDAD
              </Link>
            </li>
            <li>
              <Link href="/productos/mujer" className="text-sm text-muted-foreground hover:text-primary">
                MUJER
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">CONTACTO</h3>
          <p className="text-sm text-muted-foreground">351-4245041</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">¿DONDE ESTAMOS?</h3>
          <p className="text-sm text-muted-foreground">Corrientes 473, Centro Córdoba</p>
          <p className="text-sm text-muted-foreground">Corrientes 473, Centro, Villa Maria</p>
        </div>
      </div>

      <div className="container mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Jorge Jacobo E Hijos S.A.</p>
        <p className="text-sm text-muted-foreground">Diseñado por Aria Code</p>
      </div>
    </footer>
  )
}

