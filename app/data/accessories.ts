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
    name: "WalletIcon AirMax 1",
    brand: "Nike",
    price: 27.13,
    image:
      "https://www.bing.com/images/blob?bcid=RH3U1vu.iOoJim3KLwR2rScZYoME.....4w",
    link: "https://meli.la/2UdsTmM",
    store: "MercadoLibre"
  },
]




