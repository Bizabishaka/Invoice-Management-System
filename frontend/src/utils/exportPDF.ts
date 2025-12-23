import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportInvoicePDF = async (id: string) => {
  const el = document.getElementById(id)
  if (!el) return

  const canvas = await html2canvas(el)
  const img = canvas.toDataURL('image/png')

  const pdf = new jsPDF()
  pdf.addImage(img, 'PNG', 0, 0, 210, 297)
  pdf.save('invoice.pdf')
}
