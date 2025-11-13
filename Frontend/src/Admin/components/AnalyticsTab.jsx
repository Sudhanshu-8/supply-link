import React from "react";

const AnalyticsTab = ({ orders, stats, getStatusColor }) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const roleDistribution = [
    { role: "Vendors", count: stats.totalVendors, color: "bg-blue-500" },
    { role: "Suppliers", count: stats.totalSuppliers, color: "bg-green-500" },
    { role: "Admins", count: stats.totalAdmins, color: "bg-purple-500" }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleDistribution.map((item) => (
            <div key={item.role} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{item.role}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{item.count}</p>
                </div>
                <div className={`w-16 h-16 rounded-full ${item.color} opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Status Distribution</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-1 mx-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(status).split(" ")[0]}`}
                      style={{ width: `${orders.length > 0 ? (count / orders.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
            <p className="mt-1 text-xs text-gray-500">From {orders.filter(o => o.status === "delivered").length} delivered orders</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${orders.length > 0 && orders.filter(o => o.status === "delivered").length > 0 
                ? (stats.totalRevenue / orders.filter(o => o.status === "delivered").length).toFixed(2) 
                : "0.00"}
            </p>
            <p className="mt-1 text-xs text-gray-500">Per delivered order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;



