export type ProductType =
  | 'Speed Governor'
  | 'Tracker'
  | 'Fuel Sensor'

export const PRODUCT_PRICES: Record<ProductType, number> = {
  'Speed Governor': 25000,
  'Tracker': 25000,
  'Fuel Sensor': 40000,
}
export function getBrandTitle(product: ProductType) {
  switch (product) {
    case 'Tracker':
      return 'AFMSTrack(SG-001)'
    case 'Speed Governor':
      return 'AFMS Speed Governor'
    case 'Fuel Sensor':
      return 'AFMS Fuel Sensor'
    default:
      return 'AFMS Solutions'
  }
}
export function getProductNarration(product: ProductType) {
  switch (product) {
    case 'Tracker':
      return 'Supply and installation of vehicle tracking system.'
    case 'Speed Governor':
      return 'Supply and fitting of speed governor compliant with NTSA regulations.'
    case 'Fuel Sensor':
      return 'Supply and installation of fuel monitoring sensor.'
    default:
      return ''
  }
}


export interface InvoiceFormData {
  name: string
  phone: string
  email: string
  date: string
  location: string
  product: ProductType
  price: number
  installationFee: number
  saasFee: number
  saasEnabled: boolean
  firstMonthFree: boolean
  
}
export interface Invoice {
  id: string
  product: ProductType
  price: number
  name: string
  email: string
  phone: string
  location: string
  tax: number
  status: 'draft' | 'paid' | 'pending'
  createdAt: string
}
export const INSTALLATION_FEE = 1500;
export const SAAS_FEE = 1800;
export const VAT_RATE = 0.16;
export const SAAS_SUPPORTED_PRODUCTS: ProductType[] = [
  "Tracker",
  "Fuel Sensor",
];


