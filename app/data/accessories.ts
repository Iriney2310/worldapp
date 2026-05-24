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
    name: "Wallet Icon AF1",
    brand: "Nike",
    price: 23.69,
    image:
      "https://cdna.lystit.com/photos/nike/40569243/nike-White-Icon-Air-Force-1-Card-Wallet.jpeg",
    link: "https://meli.la/2qqcdyN",
    store: "MercadoLibre"
  },

  {
    id: 2,
    name: "WalletIcon AirMax 1",
    brand: "Nike",
    price: 24.67,
    image:
      "https://assets.solesense.com/en/images/products/500/nike-icon-air-max-90-card-wallet-smoke-grey-black-hf3717-076_1.jpg",
    link: "https://meli.la/19WCXRZ",
    store: "MercadoLibre"
  },
]