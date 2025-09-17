export interface Product {
  id: string
  documentId: string
  image: {
    url: string
    formats?: {
      medium?: { url: string }
      thumbnail?: { url: string }
    }
  }
  name: string
  price: string | number
  slug: string
}
