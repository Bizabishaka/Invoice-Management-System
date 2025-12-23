import { useState, useEffect } from "react";
import {
  type InvoiceFormData,
  type ProductType,
  PRODUCT_PRICES,
  SAAS_SUPPORTED_PRODUCTS,
  INSTALLATION_FEE,
  SAAS_FEE,
  VAT_RATE,
} from "../../../types/invoice.types";

export default function InvoiceForm({
  onChange,
}: {
  onChange: (
    data: InvoiceFormData & {
      subTotal: number;
      vat: number;
      total: number;
    }
  ) => void;
}) {
  const [form, setForm] = useState<InvoiceFormData>({
    name: "",
    phone: "",
    email: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    product: "Speed Governor",
    price: PRODUCT_PRICES["Speed Governor"],
    installationFee: INSTALLATION_FEE,
    saasFee: SAAS_FEE,
    saasEnabled: false,
    firstMonthFree: false,
  });

  const calculateTotals = (price: number, saasEnabled: boolean, firstMonthFree: boolean) => {
    const saasAmount = saasEnabled && !firstMonthFree ? SAAS_FEE : 0;
    const subTotal = price + INSTALLATION_FEE + saasAmount;
    const vat = subTotal * VAT_RATE;
    const total = subTotal + vat;
    return { subTotal, vat, total };
  };

  const update = <K extends keyof InvoiceFormData>(
    field: K,
    value: InvoiceFormData[K]
  ) => {
    let updated = { ...form, [field]: value };

    if (field === "product") {
      updated.price = PRODUCT_PRICES[value as ProductType];
      updated.saasEnabled = SAAS_SUPPORTED_PRODUCTS.includes(value as ProductType);
      if (!updated.saasEnabled) updated.firstMonthFree = false;
    }

    setForm(updated);
    const { subTotal, vat, total } = calculateTotals(
      updated.price,
      updated.saasEnabled,
      updated.firstMonthFree
    );
    onChange({ ...updated, subTotal, vat, total });
  };

  useEffect(() => {
    const { subTotal, vat, total } = calculateTotals(
      form.price,
      form.saasEnabled,
      form.firstMonthFree
    );
    onChange({ ...form, subTotal, vat, total });
  }, []);

  const { subTotal, vat, total } = calculateTotals(
    form.price,
    form.saasEnabled,
    form.firstMonthFree
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Invoice</h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="Customer Location"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Product Selection */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
          <select
            value={form.product}
            onChange={(e) => update("product", e.target.value as ProductType)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Speed Governor">Speed Governor</option>
            <option value="Tracker">Tracker</option>
            <option value="Fuel Sensor">Fuel Sensor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
          <input
            type="number"
            value={form.price}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {SAAS_SUPPORTED_PRODUCTS.includes(form.product) && (
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.saasEnabled}
                onChange={(e) => update("saasEnabled", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Enable Monthly SaaS (KES {SAAS_FEE})
            </label>
            {form.saasEnabled && (
              <label className="flex items-center gap-2 ml-4 text-sm text-green-600">
                <input
                  type="checkbox"
                  checked={form.firstMonthFree}
                  onChange={(e) => update("firstMonthFree", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                First Month Free
              </label>
            )}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-gray-700">
        <p>Installation: KES {INSTALLATION_FEE.toLocaleString()}</p>
        {form.saasEnabled && (
          <p>
            SaaS:{" "}
            {form.firstMonthFree
              ? "KES 0 (First month FREE)"
              : `KES ${SAAS_FEE.toLocaleString()}`}
          </p>
        )}
        <p>Sub Total: KES {subTotal.toLocaleString()}</p>
        <p>VAT (16%): KES {vat.toLocaleString()}</p>
        <p className="font-bold text-black text-lg">Total: KES {total.toLocaleString()}</p>
      </div>
    </div>
  );
}
