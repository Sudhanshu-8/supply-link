import React from "react";
import { Link } from "react-router-dom"; 

const Welcome = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900"
      style={{ fontFamily: '"Inter", "Noto Sans", sans-serif' }}
    >
      <header className="sticky top-0 z-10 w-full bg-slate-50/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <h1 className="text-xl font-bold tracking-tighter text-black">SupplyLink</h1>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" href="#">
                Product
              </a>
              <a className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" href="#">
                Solutions
              </a>
              <a className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" href="#">
                Resources
              </a>
              <a className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900" href="#">
                Pricing
              </a>
              <a
                className="inline-flex h-9 items-center justify-center rounded-md bg-slate-200 px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-300"
                href="#"
              >
                Contact Sales
              </a>
            </nav>
            <button className="md:hidden">
              <span className="material-symbols-outlined"> menu </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 text-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter text-slate-900 sm:text-4xl">
                Welcome to SupplyLink
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Streamline your supply chain with our powerful platform. Connect with vendors, manage orders, and optimize your operations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="material-symbols-outlined text-2xl"> person </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Returning User?</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">Log in to access your dashboard and manage your supply chain.</p>
                <Link
                  to="/login"
                  className="mt-4 inline-block w-full rounded-md bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Login
                </Link>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <span className="material-symbols-outlined text-2xl"> person_add </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">New to SupplyLink?</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">Create an account to get started and unlock powerful features.</p>
                <Link
                  to="/signup"
                  className="mt-4 inline-block w-full rounded-md bg-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© 2024 SupplyLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;

