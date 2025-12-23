export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">Total Invoices</div>
        <div className="card">Total Amount</div>
        <div className="card">Pending</div>
        <div className="card">Paid</div>
      </div>

      {/* Recent invoices */}
      <div className="card">
        <h2 className="text-lg font-medium mb-3">Recent Invoices</h2>
        <p className="text-sm text-gray-500">No invoices yet</p>
      </div>
    </div>
  );
}
