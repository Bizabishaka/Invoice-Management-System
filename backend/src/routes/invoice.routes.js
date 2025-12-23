import express from 'express'
import Invoice from '../models/Invoice.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const vat = req.body.basePrice * 0.16
  const total = req.body.basePrice + vat

  const invoice = await Invoice.create({
    ...req.body,
    vat,
    total,
    invoiceNumber: `INV-${Date.now()}`,
    userId: req.user.id
  })

  res.json(invoice)
})

router.get('/', auth, async (req, res) => {
  const invoices = await Invoice.find({ userId: req.user.id })
  res.json(invoices)
})

export default router
