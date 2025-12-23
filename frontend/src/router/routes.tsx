import { Routes, Route } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import DashboardPage from '../pages/DashboardPage'
import CreateInvoicePage from '../pages/CreateInvoicePage'
import ViewInvoicesPage from '../pages/ViewInvoicesPage'
import InvoiceDetailsPage from '../pages/InvoiceDetailsPage'
import QueryPage from '../pages/QueryPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/create' element={<CreateInvoicePage />} />
        <Route path='/invoices' element={<ViewInvoicesPage />} />
        <Route path='/invoices/:id' element={<InvoiceDetailsPage />} />
        <Route path='/query' element={<QueryPage />} />
      </Route>
    </Routes>
  )
}
