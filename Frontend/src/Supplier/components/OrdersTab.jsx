import React from "react";

const OrdersTab = ({ 
  supplierOrders, 
  user, 
  getStatusColor, 
  matchesSupplier, 
  updateOrderStatus 
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
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
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {supplierOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No orders yet</td>
                </tr>
              ) : (
                supplierOrders.map((order) => {
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
                      <td className="px-6 py-4 text-gray-600 font-semibold">${orderTotal.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${getStatusColor(order.status)}`}>
                          <span className={`h-2 w-2 rounded-full ${
                            order.status === "delivered" ? "bg-green-500" : order.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"
                          }`}></span>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {order.status === "pending" && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => updateOrderStatus(order._id, "confirmed")}
                              className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, "processing")}
                              className="rounded-md bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
                            >
                              Process
                            </button>
                          </div>
                        )}
                        {order.status === "confirmed" && (
                          <button
                            onClick={() => updateOrderStatus(order._id, "processing")}
                            className="rounded-md bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
                          >
                            Process
                          </button>
                        )}
                        {order.status === "processing" && (
                          <button
                            onClick={() => updateOrderStatus(order._id, "shipped")}
                            className="rounded-md bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700"
                          >
                            Ship
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button
                            onClick={() => updateOrderStatus(order._id, "delivered")}
                            className="rounded-md bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        )}
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
  );
};

export default OrdersTab;



