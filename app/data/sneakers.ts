
export interface Sneaker {
  id: number
  name: string
  brand: string
  price: string
  oldPrice?: string
  currency: string
  store: "Amazon" | "MercadoLibre"
  image: string
  link: string
  badge?: string
  rating: string
  usage: string
  stock: string
  tags?: string[]
}

export const sneakers: Sneaker[] = [
  {
    id: 1,
    name: "Air Force 1 '07",
    brand: "Nike",
    price: "95.95",
    currency: "EUR",
    store: "Amazon",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/e777c881-5b62-4250-92a6-362967f54cca/WMNS+AIR+FORCE+1+%2707.png",
    link: "https://www.amazon.es/dp/B08QB1YKTR?tag=iriney06-21",
    badge: "BESTSELLER",
    rating: "4.5 / 5",
    usage: "Daily",
    stock: "Ultimas Unidades",
  },

{
    id: 2,
    name: "Air Max Torch 4",
    brand: "NIKE",
    price: "105.55",
    currency: "EUR",
    store: "MercadoLibre",
    image:
      "https://cms-cdn.thesolesupplier.co.uk/2020/07/Nike-Air-Max-Torch-4-Atmosphere-Grey-Black-CI2202-001_w672_h672_pad_.jpg.webp",
    link: "https://meli.la/1tTiWWx",
    badge: "HOT",
    rating: "5 / 5",
    usage: "Running / Lifestyle",
    stock: "En Stock",
  },

  {
    id: 3,
    name: "Air Max Ltd 3",
    brand: "Nike",
    price: "90.99",
    currency: "EUR",
    store: "Amazon",
    image:
      "https://www.nespo.gr/wp-content/uploads/2023/03/687977-111-PHSLH000-2000_7.jpg",
    link: "https://amzn.to/4nIiepg",
    badge: "OFFER",
    rating: "4.0 / 5",
    tags: ["-30%"],
    usage: "Daily",
    stock: "Pocas Unidades",
  },
{
    id: 4,
    name: "Killshot 2",
    brand: "Nike",
    price: "73.83",
    currency: "EUR",
    store: "MercadoLibre",
    image:
      "https://dimarsa.vtexassets.com/arquivos/ids/241640/img-2.jpg?v=638902566333500000",
    link: "https://meli.la/2Z1RVmc",
    rating: "4.7 / 5",
    badge: "OFFER",
    tags: ["-40%"],
    usage: "Skate / Urbano",
    stock: "En Stock",
  },

  {
    id: 5,
    name: "Court Vision Low",
    brand: "Nike",
    price: "53.99",
    currency: "EUR",
    store: "Amazon",
    image:
      "https://www.intersport.es/421984/zapatillas-court-vision-lo-iic.nike.fn4019.001.jpg",
    link: "https://amzn.to/4die6c0",
    rating: "4.4 / 5",
    usage: "Daily / Lifestyle",
    stock: "En Stock",
  },

  {
    id: 6,
    name: "Grand Court Base 00s",
    brand: "Adidas",
    price: "39.99",
    currency: "EUR",
    store: "Amazon",
    image:
      "https://www.sportvision.ba/files/images/slike_proizvoda/media/IH6/IH6185/images/IH6185.jpg",
    link: "https://amzn.to/3Px9aGX",
    badge: "HOT",
    rating: "4.4 / 5",
    usage: "Daily / Lifestyle",
    stock: "En Stock",
  },

  {
    id: 7,
    name: "Court Vision Low",
    brand: "Nike",
    price: "72.67",
    currency: "EUR",
    store: "MercadoLibre",
    image:
      "https://cdn.evrysz.net/1000x1000/4/nike-court-vision-low-next-nature-dh3158003.png",
    link: "https://meli.la/2sepjTm",
    rating: "4.8 / 5",
    usage: "Casual / Urbano",
    stock: "En Stock",
  },

  {
    id: 8,
    name: "VL Court 3.0",
    brand: "Adidas",
    price: "41.99",
    currency: "EUR",
    store: "Amazon",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_784415-MLA79213189690_092024-O.webp",
    link: "https://amzn.to/4nHqSUY",
    rating: "4.5 / 5",
    usage: "Football / Lifestyle",
    stock: "En Stock",
  },

  {
    id: 9,
    name: "Terra Manta",
    brand: "Nike",
    price: "64.45",
    currency: "EUR",
    store: "MercadoLibre",
    image:
      "https://cdn.store-assets.com/s/234724/i/87840137.jpeg",
    link: "https://meli.la/22aBd6a",
    rating: "4.8 / 5",
    badge: "OFFER",
    tags: ["-41%"],
    usage: "Casual / Urbano",
    stock: "En Stock",
  },

  {
    id: 9,
    name: "Revolution 8",
    brand: "Nike",
    price: "79.98",
    currency: "EUR",
    store: "MercadoLibre",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_2X_934161-MLA110084335065_042026-F.webp",
    link: "https://meli.la/2SXBeBz",
    rating: "4.7 / 5",
    badge: "BESTSELLER",
    usage: "Running",
    stock: "En Stock",
  },
]