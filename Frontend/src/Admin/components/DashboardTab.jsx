import React from "react";

const DashboardTab = ({ stats, orders, loading, getStatusColor }) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="mt-1 text-xs text-gray-500">
              {stats.totalVendors} Vendors, {stats.totalSuppliers} Suppliers, {stats.totalAdmins} Admins
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            <p className="mt-1 text-xs text-gray-500">Active listings</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            <p className="mt-1 text-xs text-gray-500">{stats.pendingOrders} pending</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
            <p className="mt-1 text-xs text-gray-500">From delivered orders</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Vendor</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">Loading...</td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No orders yet</td>
                  </tr>
                ) : (
                  orders.slice(0, 10).map((order) => (
                    <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">#{order._id.slice(-6)}</td>
                      <td className="px-6 py-4">{order.vendor?.name || "Unknown"}</td>
                      <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
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



