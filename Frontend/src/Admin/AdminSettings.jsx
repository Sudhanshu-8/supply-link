import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminSettings = () => {
  const { logout } = useAuth();
  
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 font-sans">
      <div className="flex h-full grow">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white shadow-md">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <p className="text-sm font-medium">Dashboard</p>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">local_shipping</span>
                <p className="text-sm font-medium">Orders</p>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                <p className="text-sm font-medium">Products</p>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">group</span>
                <p className="text-sm font-medium">Customers</p>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 bg-blue-100 text-blue-600"
              >
                <span className="material-symbols-outlined">settings</span>
                <p className="text-sm font-medium">Settings</p>
              </a>
            </div>

            <div className="mt-auto">
              <button
                onClick={logout}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 w-full"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-500 mt-1">
                Manage your application settings here.
              </p>
            </header>

            <div className="space-y-12">
              {/* User Permissions */}
              <section className="border-b pb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  User Permissions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Administrator</option>
                      <option>Vendor</option>
                      <option>Supplier</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="access-level"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Access Level
                    </label>
                    <select
                      id="access-level"
                      name="access-level"
                      className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Full Access</option>
                      <option>Read-Only</option>
                      <option>Limited Access</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Notification Preferences */}
              <section className="border-b pb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="email-notifications"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="in-app-notifications"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="in-app-notifications"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      In-App Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="sms-notifications"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      SMS Notifications
                    </label>
                  </div>
                </div>
              </section>

              {/* System Integrations */}
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  System Integrations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="crm-integration"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      CRM Integration
                    </label>
                    <select
                      id="crm-integration"
                      name="crm-integration"
                      className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="accounting-integration"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Accounting Integration
                    </label>
                    <select
                      id="accounting-integration"
                      name="accounting-integration"
                      className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* Save Button */}
            <div className="mt-12 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
