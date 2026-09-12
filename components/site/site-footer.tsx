import Link from 'next/link'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Men', href: '/shop/men' },
      { label: 'Women', href: '/shop/women' },
      { label: 'Signature Collection', href: '/shop' },
      { label: 'Custom Tailoring', href: '/custom' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Measurements', href: '/measurements' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/account/orders' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Craftsmanship', href: '/about' },
      { label: 'Fabrics', href: '/custom' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Privacy', href: '/policies' },
      { label: 'Terms', href: '/policies' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-offwhite">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <p className="font-serif text-3xl tracking-wide-sm">BESPOKE</p>
            <p className="mt-2 text-[10px] tracking-luxe text-muted-foreground uppercase">
              Tailored For You
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium custom tailoring for men and women. Designed by you, crafted by us, delivered
              worldwide.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] tracking-wide-sm text-foreground uppercase">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-[11px] tracking-wide-sm text-muted-foreground uppercase md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} BESPOKE. All rights reserved.</p>
          <p>Custom Tailoring • Premium Fabrics • Worldwide Shipping</p>
        </div>
      </div>
    </footer>
  )
}
