export type Accessory = {
  id: number
  name: string
  price: number
  image: string
  link: string
  brand: 'Nike' | 'Adidas' | 'New Era'
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
    name: "Wallet Icon AirMax 1",
    brand: "Nike",
    price: 24.67,
    image:
      "https://assets.solesense.com/en/images/products/500/nike-icon-air-max-90-card-wallet-smoke-grey-black-hf3717-076_1.jpg",
    link: "https://meli.la/19WCXRZ",
    store: "MercadoLibre"
  },

  {
    id: 3,
    name: "WalletIcon AirMax 90",
    brand: "Nike",
    price: 29.07,
    image:
      "https://static.luck-d.com/product/43069/main_carousel/NIKE_ICON_AIR_MAX_90_CARD_WALLET_INFRARED_HF3717068_130728.webp",
    link: "https://meli.la/1LdeM7Y",
    store: "MercadoLibre"
  },

  {
    id: 4,
    name: "Mochila Stadium",
    brand: "New Era",
    price: 24.95,
    image:
      "https://i.pinimg.com/736x/ae/cb/16/aecb16f4b63e7abde0e71741811d2868.jpg",
    link: "https://amzn.to/49Rv6DH",
    store: "Amazon"
  },

  {
    id: 5,
    name: "Gorra Aframe Dodgers",
    brand: "New Era",
    price: 70.51,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_926978-MLA110739752894_052026-F.webp",
    link: "https://meli.la/31JKjGW",
    store: "MercadoLibre"
  },
]




