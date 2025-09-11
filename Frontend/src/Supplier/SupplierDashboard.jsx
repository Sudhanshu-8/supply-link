// src/SupplierDashboard.jsx
import React from "react";

const SupplierDashboard = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-start border-b border-gray-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
              <span className="material-symbols-outlined">all_inbox</span>
            </div>
            <span className="text-lg font-bold">Acme Co</span>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <a className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Products</span>
          </a>
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span>Orders</span>
          </a>
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-gray-200 p-4">
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <a className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" href="#">
            <span className="material-symbols-outlined">account_circle</span>
            <div className="flex flex-col">
              <span className="font-medium">Supplier</span>
              <span className="text-xs text-gray-500">logout</span>
            </div>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/70 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of your products and orders</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <span className="material-symbols-outlined text-base">add</span>
              New Product
            </button>
            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
              <span className="material-symbols-outlined text-base">download</span>
              Export
            </button>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Total Products</h3>
              <p className="mt-2 text-3xl font-bold">25</p>
              <p className="mt-1 text-sm text-gray-500">+2 since last month</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Pending Orders</h3>
              <p className="mt-2 text-3xl font-bold">12</p>
              <p className="mt-1 text-sm text-gray-500">+5 since yesterday</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
              <p className="mt-2 text-3xl font-bold">$12,450</p>
              <p className="mt-1 text-sm text-gray-500">+8% since last month</p>
            </div>
          </div>

          {/* Product Listings */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold">Product Listings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Inventory</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Updated</th>
                    <th className="px-6 py-3"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Eco-Friendly Cleaning Spray</td>
                    <td className="px-6 py-4 text-gray-600">150</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">2023-11-15</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                  {/* More rows like above */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3"><span className="sr-only">View</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">#12345</td>
                    <td className="px-6 py-4 text-gray-600">Emily Carter</td>
                    <td className="px-6 py-4 text-gray-600">2023-11-18</td>
                    <td className="px-6 py-4 text-gray-600">$50.00</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm text-yellow-700">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700">View Order</button>
                    </td>
                  </tr>
                  {/* More orders */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierDashboard;
