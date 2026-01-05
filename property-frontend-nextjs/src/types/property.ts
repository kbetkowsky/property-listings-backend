export interface Property {
  id: number
  title: string
  description: string
  price: number
  type: 'SALE' | 'RENT'
  city: string
  address: string
  area: number
  rooms: number | null
  bathrooms: number | null
  floor: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  owner: PropertyOwner
  imageUrls: string[] | null
}

export interface PropertyOwner {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string | null
}

export interface PagedResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
}
