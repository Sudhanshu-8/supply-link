// src/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div
      className="bg-gray-50 text-gray-900 min-h-screen"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex h-full grow">
          {/* Sidebar */}
          <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-800">
                Admin Panel
              </h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              <a className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary-100 text-primary-700" href="#">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">group</span>
                <span className="text-sm font-medium">Vendors</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">local_shipping</span>
                <span className="text-sm font-medium">Suppliers</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-sm font-medium">Analytics</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">help</span>
                <span className="text-sm font-medium">Support</span>
              </a>
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900" href="#">
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">Logout</span>
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Overview of system operations and user management.
                </p>
              </div>

              {/* System Overview */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  System Overview
                </h2>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">
                      Total Vendors
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">125</p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">
                      Total Suppliers
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">210</p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">335</p>
                  </div>
                </div>
              </div>

              {/* User Management */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  User Management
                </h2>
                <div className="mt-4 overflow-hidden bg-white border border-gray-200 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-6 py-3">User</th>
                          <th className="px-6 py-3">Role</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Liam Carter
                          </td>
                          <td className="px-6 py-4">Vendor</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Olivia Bennett
                          </td>
                          <td className="px-6 py-4">Supplier</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Noah Harper
                          </td>
                          <td className="px-6 py-4">Admin</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Ava Morgan
                          </td>
                          <td className="px-6 py-4">Vendor</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inactive
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Ethan Walker
                          </td>
                          <td className="px-6 py-4">Supplier</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
