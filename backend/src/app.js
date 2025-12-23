import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/invoices', invoiceRoutes)

export default app
