import React from "react";

const DashboardTab = ({ stats, supplierOrders, user, getStatusColor, matchesSupplier }) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
            <p className="mt-2 text-3xl font-bold">{stats.totalProducts}</p>
            <p className="mt-1 text-sm text-gray-500">Active listings</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Pending Orders</h3>
            <p className="mt-2 text-3xl font-bold">{stats.pendingOrders}</p>
            <p className="mt-1 text-sm text-gray-500">Require attention</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            <p className="mt-1 text-sm text-gray-500">From delivered orders</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {supplierOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No orders yet</td>
                  </tr>
                ) : (
                  supplierOrders.slice(0, 5).map((order) => {
                    const orderTotal = order.items
                      .filter((item) => matchesSupplier(item.supplier))
                      .reduce((sum, item) => sum + item.price * item.quantity, 0);
                    return (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">#{order._id.slice(-6)}</td>
                        <td className="px-6 py-4 text-gray-600">{order.vendor?.name || "Unknown"}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600">${orderTotal.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${getStatusColor(order.status)}`}>
                            <span className={`h-2 w-2 rounded-full ${
                              order.status === "delivered" ? "bg-green-500" : order.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"
                            }`}></span>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;



