import { createContext, useContext, useState } from 'react'
import type { Invoice } from '../types/invoice.types'

interface InvoiceContextType {
  invoices: Invoice[]
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (invoice: Invoice) => void
  deleteInvoice: (id: string) => void
}

const InvoiceContext = createContext<InvoiceContextType | null>(null)

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const addInvoice = (invoice: Invoice) =>
    setInvoices(prev => [...prev, invoice])

  const updateInvoice = (invoice: Invoice) =>
    setInvoices(prev => prev.map(i => i.id === invoice.id ? invoice : i))

  const deleteInvoice = (id: string) =>
    setInvoices(prev => prev.filter(i => i.id !== id))

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export const useInvoices = () => {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoices outside provider')
  return ctx
}
