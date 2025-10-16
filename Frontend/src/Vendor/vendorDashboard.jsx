import React from "react";

export default function VendorDashboard() {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/80 px-10 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-slate-800">
            <svg
              className="h-8 w-8 text-primary-600"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">
              SupplyLink
            </h2>
          </div>
          <nav className="hidden items-center gap-9 md:flex">
            <a className="text-slate-600 hover:text-primary-600 text-sm font-medium transition-colors" href="#">
              Catalog
            </a>
            <a className="text-slate-600 hover:text-primary-600 text-sm font-medium transition-colors" href="#">
              Orders
            </a>
            <a className="text-slate-600 hover:text-primary-600 text-sm font-medium transition-colors" href="#">
              Cart
            </a>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Search */}
          <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="relative flex w-full items-stretch rounded-md h-full">
              <div className="absolute left-0 top-0 flex h-full items-center justify-center pl-3 text-slate-400">
                <span className="material-symbols-outlined !text-2xl">search</span>
              </div>
              <input
                className="form-input flex w-full rounded-md border border-slate-300 bg-white h-full pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-0 focus:ring-2 focus:ring-primary-500/50"
                placeholder="Search"
              />
            </div>
          </label>

          <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqrCjfMyD5x15-B8rfnYqFt8KJrVsUre360jcMRsIWhyD5q0uAz_WONfaqr7T8sg_PYeRa5R2Nne7r1HXWr8fBtMYT0PjJ2gTgyqVQAS9R1KNObU6j71BNze2xYUQTta5JwFZKeg8BeG67lQtsQ1SAlXmOBpzWF7Y26UEn92207unM6jOU1tKthcjwgE66NDCenLB6m_FJK-Atxlm9KtM5VanHIMLLV39KtEPB0V6t18zErmJwOXvBCfogpcD8Of4YE7e37ayGLXE')",
            }}
          ></div>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-64 flex-col border-r border-slate-200 bg-white/60 p-4 overflow-y-auto lg:flex custom-scrollbar">
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 rounded-md bg-primary-500/10 px-3 py-2 text-primary-600" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-sm font-medium">Dashboard</p>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              <span className="material-symbols-outlined">book</span>
              <p className="text-sm font-medium">Catalog</p>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              <span className="material-symbols-outlined">local_shipping</span>
              <p className="text-sm font-medium">Orders</p>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              <span className="material-symbols-outlined">shopping_cart</span>
              <p className="text-sm font-medium">Cart</p>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100" href="#">
              <span className="material-symbols-outlined">person</span>
              <p className="text-sm font-medium">Account</p>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-slate-900 text-3xl font-bold leading-tight">Vendor Dashboard</h1>

            {/* Catalog Section */}
            <section className="mt-8">
              <h2 className="text-slate-800 text-xl font-semibold">Browse Catalog</h2>
              {/* Search + Categories */}
              <div className="mt-4">
                <label className="flex flex-col h-12 w-full">
                  <div className="relative flex w-full rounded-md h-full">
                    <div className="absolute left-0 top-0 flex h-full items-center justify-center pl-4 text-slate-400">
                      <span className="material-symbols-outlined !text-2xl">search</span>
                    </div>
                    <input
                      className="form-input w-full rounded-lg border border-slate-300 bg-white h-full pl-12 pr-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-0 focus:ring-2 focus:ring-primary-500/50"
                      placeholder="Search for products"
                    />
                  </div>
                </label>
              </div>

              {/* Categories */}
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="flex h-9 items-center rounded-full bg-primary-500 px-4 text-white">
                  <p className="text-sm font-medium">All</p>
                </button>
                {["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"].map((cat, i) => (
                  <button
                    key={i}
                    className="flex h-9 items-center rounded-full border border-slate-300 bg-white px-4 hover:bg-slate-50"
                  >
                    <p className="text-slate-600 text-sm font-medium">{cat}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Orders Section */}
            <section className="mt-12">
              <h2 className="text-slate-800 text-xl font-semibold">Order Management</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Order ID</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">Total</th>
                      <th className="py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-800">#12345</td>
                      <td className="px-3 py-4 text-sm text-slate-500">2023-01-15</td>
                      <td className="px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Shipped
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">$250.00</td>
                      <td className="px-3 py-4 text-sm text-right">
                        <a href="#" className="text-primary-600 hover:text-primary-800">
                          View
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-800">#67890</td>
                      <td className="px-3 py-4 text-sm text-slate-500">2023-02-20</td>
                      <td className="px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">$150.00</td>
                      <td className="px-3 py-4 text-sm text-right">
                        <a href="#" className="text-primary-600 hover:text-primary-800">
                          View
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-slate-800">#11223</td>
                      <td className="px-3 py-4 text-sm text-slate-500">2023-03-10</td>
                      <td className="px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500">$300.00</td>
                      <td className="px-3 py-4 text-sm text-right">
                        <a href="#" className="text-primary-600 hover:text-primary-800">
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 border-t border-slate-200 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap gap-6">
                  <a href="#" className="text-slate-500 hover:text-primary-600 text-sm">
                    Terms of Service
                  </a>
                  <a href="#" className="text-slate-500 hover:text-primary-600 text-sm">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-slate-500 hover:text-primary-600 text-sm">
                    Contact Us
                  </a>
                </div>
                <p className="text-slate-500 text-sm">© 2024 ProcureX. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
