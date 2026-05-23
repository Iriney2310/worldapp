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
      "https://www.mercadolibre.com.ar/billetera-nike-icon-air-force-1-blanco-176/p/MLA57129183?matt_event_ts=1779579807907&matt_d2id=b7d497e6-bc6f-4e26-a9bb-be3cec3835b5&matt_tracing_id=15de5d4c-8215-4b24-9d01-e2ee4b9be248#polycard_client=recommendations_home_affiliate-profile&reco_backend=item_decorator&reco_client=home_affiliate-profile&reco_item_pos=0&source=affiliate-profile&reco_backend_type=function&reco_id=742bda90-860d-43be-bf06-a4d54c0be048&tracking_id=21db6753-9228-41f2-ad18-5018a19fdbe5&wid=MLA2381830926&sid=recos&c_id=/home/card-featured/element&c_uid=4a0e5f28-b2d0-4e79-9cb7-c0d255a0ecd9",
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