// NAYA MENU STRUCTURE
const NAV_ITEMS = [
  {
    name: "Ready to Wear",
    href: "/shop",
    submenu: [
      { name: "For Him", href: "/shop?gender=men" },   // Naya Link
      { name: "For Her", href: "/shop?gender=women" }, // Naya Link
    ]
  },
  {
    name: "Made to Measure",
    href: "/custom",
    submenu: [
      { name: "For Him", href: "/custom/men" },
      { name: "For Her", href: "/custom/women" },
    ]
  },
  {
    name: "Seasonal",
    href: "/seasonal",
    submenu: [
      { name: "Halloween", href: "/seasonal?category=halloween" },
      { name: "Superhero", href: "/seasonal?category=superhero" },
      { name: "Gothic", href: "/seasonal?category=gothic" },
      { name: "Party Wear", href: "/seasonal?category=party" },
    ]
  },
  {
    name: "Atelier",
    href: "/about",
  }
];
