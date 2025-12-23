import { useState } from 'react'

import InvoiceForm from '../components/Invoices/InvoiceForm/InvoiceForm'
import InvoicePreview from '../components/Invoices/InvoicePreview/InvoicePreview'
import type { InvoiceFormData } from '../types/invoice.types'

export default function CreateInvoicePage() {
  const [invoice, setInvoice] = useState<InvoiceFormData | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InvoiceForm onChange={setInvoice} />
      {invoice && <InvoicePreview invoice={invoice} />}
    </div>
  )
}
