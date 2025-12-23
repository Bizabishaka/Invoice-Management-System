import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  userId: String,
  invoiceNumber: String,
  name: String,
  email: String,
  phone: String,
  location: String,
  product: String,
  basePrice: Number,
  vat: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Invoice', InvoiceSchema)
