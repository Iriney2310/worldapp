export interface Accessory {
  id: number
  name: string
  brand: string
  price: string
  currency: string
  image: string
  link: string
}

export const accessories = [
  {
    id: 1,
    name: "Gorra Nike",
    brand: "Nike",
    price: "19.99",
    currency: "EUR",
    image: "https://example.com/gorra.jpg",
    link: "https://amazon.es",
  },
]