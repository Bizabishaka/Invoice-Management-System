import {
  type InvoiceFormData,
  getBrandTitle,
  getProductNarration,
  VAT_RATE,
} from "../../../types/invoice.types";
import logo from "../../../assets/Logo AFMS Without Background.png";
import signature from "../../../assets/signature (1).png";

export default function InvoicePreview({
  invoice,
}: {
  invoice: InvoiceFormData;
}) {
  // ✅ Calculate subtotal including installation + SaaS
  const subTotal =
    invoice.price +
    invoice.installationFee +
    (invoice.saasEnabled && !invoice.firstMonthFree ? invoice.saasFee : 0);

  const vat = subTotal * VAT_RATE;
  const totalAfterVat = subTotal + vat;

  return (
    <div className="p-8 border rounded-xl bg-white space-y-8 text-sm max-w-3xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={logo} alt="AFMS logo" className="h-16 object-contain" />
      </div>

      {/* Company Info */}
      <div className="text-center text-xs text-gray-600 space-y-1">
        <p className="font-semibold text-gray-800">Africa Fleet Management Solutions</p>
        <p>P.O. Box 12345 – 00100, Nairobi, Kenya</p>
        <p>Tel: +254 743 112 112 | Email: sales.admin@afms.co.ke</p>
      </div>

      <hr />

      {/* Client + Invoice Info */}
      <div className="flex justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-base">{invoice.name}</h3>
          <p>{invoice.location}</p>
          <p>{invoice.email}</p>
          <p>{invoice.phone}</p>
        </div>

        <div className="text-right space-y-1">
          <p className="font-semibold">Invoice No: INV-001</p>
          <p>Date: {invoice.date}</p>
          <p>Installation Period: 30 days</p>
        </div>
      </div>

      <hr />

      {/* Brand + Narration */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{getBrandTitle(invoice.product)}</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          {getProductNarration(invoice.product)}
        </p>
      </div>

      <hr />

      {/* Line Items */}
      <div className="space-y-3">
        <div className="flex justify-between font-semibold border-b pb-2">
          <span>Description</span>
          <span>Amount</span>
        </div>

        <div className="flex justify-between">
          <span>{invoice.product} — Supply and Installation</span>
          <span>KES {invoice.price.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Installation Charges</span>
          <span>KES {invoice.installationFee.toLocaleString()}</span>
        </div>

        {invoice.saasEnabled && (
          <div className="flex justify-between text-gray-700">
            <span>
              Monthly SaaS Subscription
              {invoice.firstMonthFree && (
                <span className="ml-2 text-xs text-green-600">(First month FREE)</span>
              )}
            </span>
            <span>
              {invoice.firstMonthFree
                ? "KES 0"
                : `KES ${invoice.saasFee.toLocaleString()}`}
            </span>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-full sm:w-1/2 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Sub Total</span>
            <span>KES {subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>VAT (16%)</span>
            <span>KES {vat.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>KES {totalAfterVat.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <hr />

      {/* Payment Details */}
      <div className="space-y-1">
        <p className="font-semibold">Payment Details</p>
        <p>Mpesa Paybill: 8000800</p>
        <p>Account No: Vehicle Registration</p>
        <p>KCB Bank A/C: 0000</p>
      </div>

      {/* Signature */}
      <div className="flex justify-end pt-4">
        <div className="text-center">
          <img
            src={signature}
            alt="Authorized signature"
            className="h-16 object-contain mx-auto"
          />
          <p className="text-xs text-gray-500 mt-1">George</p>
        </div>
      </div>
    </div>
  );
}
