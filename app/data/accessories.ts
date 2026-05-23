export type Accessory = {
  id: number
  name: string
  price: number
  image: string
  link: string
  brand: 'Nike' | 'Adidas'
  store: 'Amazon' | 'MercadoLibre'
}

export const accessories: Accessory[] = [
  {
    id: 1,
    name: "Billetera",
    brand: "Nike",
    price: 24.99,
    image:
      "https://static.nike.com/a/images/t_default/fd8f9b7d/nike-cap.png",
    link: "https://meli.la/2qqcdyN",
    store: "MercadoLibre"
  },

  {
    id: 2,
    name: "Adidas Backpack",
    brand: "Adidas",
    price: 39.99,
    image:
      "https://assets.adidas.com/images/backpack.png",
    link: "https://adidas.com",
    store: "MercadoLibre"
  },
]