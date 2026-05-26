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
    name: "Gorra New York Yankees",
    brand: "New Era",
    price: 16.99,
    image:
      "https://www.billioncreation.com/wp-content/uploads/2021/02/New-Era-New-York-Yankees-The-League-Game-Dark-Navy-9Forty-hat-Left-Front-478x478.jpg",
    link: "https://amzn.to/4utU5VV",
    store: "Amazon"
  },

  {
    id: 6,
    name: "Gorra Los Angeles Dodgers",
    brand: "New Era",
    price: 14.99,
    image:
      "https://www.bing.com/images/search?view=detailV2&ccid=JejaJ%2FD3&id=4CC845BCBB8344DFD14DA2D27BFAE2EBAFDF4A12&thid=OIP.JejaJ_D3vRq1_52LM8tHSgHaHa&mediaurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Fd7%2F6f%2F28%2Fd76f28e0bdfe2e64ab330a8a92a8facc.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.25e8da27f0f7bd1ab5ff9d8b33cb474a%3Frik%3DEkrfr%252bvi%252bnvSog%26pid%3DImgRaw%26r%3D0&exph=736&expw=736&q=gorra+los+angeles+dodgers+azul&form=IRPRST&ck=38DBECE5C4BC22281BCD0A1D1EEEA212&selectedindex=17&itb=0&ajaxhist=0&ajaxserp=0&cit=ccid_CJVaMLmR*cp_3CD04CD5596C70D8B0854D4374E29403*mid_3A4F2E4020686B288D890100B751EF09ACC015DE*thid_OIP.CJVaMLmRWsevzoO5-jm49QHaHa&vt=2",
    link: "https://amzn.to/3RrLMLS",
    store: "Amazon"
  },

  {
    id: 7,
    name: "Gorra Boston Red Sox",
    brand: "New Era",
    price: 18.99,
    image:
      "https://www.sportbuffshop.com/cms_files/products/phprHSLnf.jpg",
    link: "https://amzn.to/3PYrsBj",
    store: "Amazon"
  },
  
 {
    id: 8,
    name: "Gorra Chicago White Sox",
    brand: "New Era",
    price: 24.90,
    image:
      "https://th.bing.com/th/id/R.67fc1b5c493ee462edb3971d6996197d?rik=G3bcChHYFuZRqg&riu=http%3a%2f%2fwww.hueteundmuetzen.de%2fcdn%2fshop%2fproducts%2f210380.jpg%3fv%3d1661397435&ehk=GRq0A2jRGrcs6M9i5arH8NRzXRJdriaLgVWa9nok8X8%3d&risl=&pid=ImgRaw&r=0",
    link: "https://amzn.to/4tX3xjK",
    store: "Amazon"
  },
  
  {
    id: 9,
    name: "Gorra Kansas City Royals",
    brand: "New Era",
    price: 18.99,
    image:
      "https://feeds.frgimages.com/ss4/https://feeds.frgimages.com/ss4/altimages/ss4/p-11880091_u-1hk52bkwkoouq1bjykm5_v-da25b6eb7e3b4636a438f91c81c7c0d6.jpg?_hv=3",
    link: "https://amzn.to/4v4WTsr",
    store: "Amazon"
  },
  
  {
    id: 10,
    name: "Gorra Houston Astros",
    brand: "New Era",
    price: 18.99,
    image:
      "https://www.innovasport.com/medias/1200Wx1200H-NEW-media-gallery-000000000000401503-01-20251125121212.jpg?context=bWFzdGVyfGltYWdlc3wxMDg3ODh8aW1hZ2UvanBlZ3xhREkxTDJnME9DOHhOVGd6TVRBek9EUTVNamN3TWk4eE1qQXdWM2d4TWpBd1NGOU9SVmRmYldWa2FXRmZaMkZzYkdWeWVWOHdNREF3TURBd01EQXdNREEwTURFMU1ETmZNREZmTWpBeU5URXhNalV4TWpFeU1USXVhbkJufDY2ZTBiMjc0N2FkN2NhYjE5ZWQ1ZTE5MjUzNjRmOTM1NjJiOGVhNzZlZGQ1ZWMyMzU4NTA2ODQ0NWE1YmQ1ZjI",
    link: "https://amzn.to/4usWnol",
    store: "Amazon"
  },

  {
    id: 11,
    name: "Gorra Los Angeles Dodgers",
    brand: "New Era",
    price: 24.95,
    image:
      "https://www.sportbuffshop.com/cms_files/products/phpgmomKl.jpg",
    link: "https://amzn.to/4vgqS0V",
    store: "Amazon"
  },

  {
    id: 12,
    name: "Gorra Maiami Marlins",
    brand: "New Era",
    price: 29.90,
    image:
      "https://i.pinimg.com/736x/f6/6b/16/f66b16074dcc0da0cfaee4c5f607c52a.jpg",
    link: "https://amzn.to/49j7uYv",
    store: "Amazon"
  },

  {
    id: 13,
    name: "Gorra New York Mets",
    brand: "New Era",
    price: 26.66,
    image:
      "https://www.sportbuffshop.com/cms_files/products/phpz4KyF6.jpg",
    link: "https://amzn.to/4uwylbU",
    store: "Amazon"
  },

  {
    id: 14,
    name: "Gorra Baltimore Orioles",
    brand: "New Era",
    price: 24.90,
    image:
      "https://academy.scene7.com/is/image/academy/headwear/new-era-/-baltimore-orioles-mlb-team-classic-39thirty-flex-hat-10975838-white/og-image/6f66f8038ceb452083a6c4fd443f67b2",
    link: "https://amzn.to/3RuJICJ",
    store: "Amazon"
  },

  {
    id: 15,
    name: "Gorra Arizona Diamondbacks",
    brand: "New Era",
    price: 25.94,
    image:
      "https://static.caphunters.es/33889-large_default/gorra-curva-negra-ajustable-9forty-the-league-de-arizona-diamondbacks-mlb-de-new-era.webp",
    link: "https://amzn.to/4nS7e8Q",
    store: "Amazon"
  },

  {
    id: 16,
    name: "Gorra NY Yankees Black",
    brand: "New Era",
    price: 22.69,
    image:
      "https://th.bing.com/th/id/R.3d57def8fb951308226d70a9ee6c43c0?rik=vNXFmyGTP2ZH%2fA&riu=http%3a%2f%2fchildrensfootball.com%2fcdn%2fshop%2ffiles%2f60284898.png%3fv%3d1712786010&ehk=PQVeRmeCk%2fDsma8OCwU7jc7zZmIz%2bLx0BKs01jijhBA%3d&risl=&pid=ImgRaw&r=0",
    link: "https://amzn.to/3PsosNr",
    store: "Amazon"
  },

]




