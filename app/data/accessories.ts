export interface Accessory {
  id: number
  name: string
  brand: string
  price: string
  image: string
  link: string
}

export const accessories: Accessory[] = [
  {
    id: 1,
    name: "Nike Cap",
    brand: "Nike",
    price: "24.99",
    image:
      "https://static.nike.com/a/images/t_default/fd8f9b7d/nike-cap.png",
    link: "https://nike.com",
  },

  {
    id: 2,
    name: "Adidas Backpack",
    brand: "Adidas",
    price: "39.99",
    image:
      "https://assets.adidas.com/images/backpack.png",
    link: "https://adidas.com",
  },
]