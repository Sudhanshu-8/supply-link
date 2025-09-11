import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 text-blue-600">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tighter text-slate-900">
            ProcureX
          </h2>
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium text-slate-700">
          <a href="#" className="hover:text-blue-600">Product</a>
          <a href="#" className="hover:text-blue-600">Solutions</a>
          <a href="#" className="hover:text-blue-600">Resources</a>
          <a href="#" className="hover:text-blue-600">Pricing</a>
          <Link
            to="/login"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Log in
          </Link>
        </nav>
      </header>

      {/* Signup Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-sm border border-slate-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email or phone number"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />

            <select
              id="role"
              name="role"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-3 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select your role</option>
              <option value="vendor">Vendor</option>
              <option value="supplier">Supplier</option>
              <option value="admin">Admin</option>
            </select>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-slate-900">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-900">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
