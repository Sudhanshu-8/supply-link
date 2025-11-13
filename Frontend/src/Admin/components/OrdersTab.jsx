import React from "react";

const OrdersTab = ({ orders, loading, getStatusColor }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Vendor</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">Loading...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No orders yet</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order._id.slice(-6)}</td>
                    <td className="px-6 py-4">{order.vendor?.name || "Unknown"}</td>
                    <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{order.items?.length || 0} items</td>
                    <td className="px-6 py-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
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
  );
};

export default OrdersTab;



