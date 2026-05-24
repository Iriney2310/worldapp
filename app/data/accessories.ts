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
    name: "Billetera Icon AF1",
    brand: "Nike",
    price: 23.69,
    image:
      "https://cdna.lystit.com/photos/nike/40569243/nike-White-Icon-Air-Force-1-Card-Wallet.jpeg",
    link: "https://meli.la/2qqcdyN",
    store: "MercadoLibre"
  },

  {
    id: 2,
    name: "Adidas Backpack",
    brand: "Nike",
    price: 39.99,
    image:
      "https://assets.adidas.com/images/backpack.png",
    link: "https://adidas.com",
    store: "MercadoLibre"
  },
]