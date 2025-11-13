import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const NAV_SECTIONS = [
  { key: "dashboard", label: "Catalog", icon: "dashboard" },
  { key: "orders", label: "Orders", icon: "receipt_long" }
];

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeSection = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const section = segments[1] || "dashboard"; // /vendordashboard/<section>
    return NAV_SECTIONS.some((item) => item.key === section) ? section : "dashboard";
  }, [location.pathname]);

  useEffect(() => {
    if (!NAV_SECTIONS.some((item) => item.key === activeSection)) {
      navigate("/vendordashboard", { replace: true });
    }
  }, [activeSection, navigate]);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [comparisonSearch, setComparisonSearch] = useState("");

  const categories = ["All", "Food & Beverages", "Electronics", "Clothing", "Household", "Other"];

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [category, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts();
      fetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, [category, searchTerm]);

  useEffect(() => {
    if (activeSection === "orders") {
      const timer = setTimeout(() => {
        document.getElementById("vendor-orders")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [activeSection]);

  const handleNavigate = (section) => {
    if (section === "dashboard") {
      navigate("/vendordashboard");
    } else {
      navigate(`/vendordashboard/${section}`);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category && category !== "All") params.category = category;
      if (searchTerm) params.search = searchTerm;
      const res = await api.get("/products", { params });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product._id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const comparePrices = async () => {
    if (!comparisonSearch.trim()) return;
    try {
      setLoading(true);
      const res = await api.get("/products/compare", {
        params: { productName: comparisonSearch }
      });
      setComparisonResults(res.data);
      setShowPriceComparison(true);
    } catch (error) {
      console.error("Error comparing prices:", error);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    try {
      const orderItems = cart.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity
      }));

      await api.post("/orders", {
        items: orderItems,
        shippingAddress: {
          street: "123 Main St",
          city: "City",
          state: "State",
          zipCode: "12345",
          country: "Country"
        }
      });

      setCart([]);
      setShowCart(false);
      fetchOrders();
      alert("Order placed successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to place order");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/80 px-4 md:px-10 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 text-slate-800">
            <svg
              className="h-8 w-8 text-blue-600"
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
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            onClick={() => setShowPriceComparison(!showPriceComparison)}
            className="hidden lg:flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <span className="material-symbols-outlined">compare_arrows</span>
            Compare Prices
          </button>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <button
              onClick={logout}
              className="rounded-md bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1 bg-slate-50 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-slate-900 text-2xl md:text-3xl font-bold leading-tight">
              Vendor Dashboard
            </h1>

            {/* Price Comparison Modal */}
            {showPriceComparison && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Price Comparison</h2>
                    <button
                      onClick={() => {
                        setShowPriceComparison(false);
                        setComparisonResults([]);
                        setComparisonSearch("");
                      }}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={comparisonSearch}
                      onChange={(e) => setComparisonSearch(e.target.value)}
                      placeholder="Enter product name to compare"
                      className="flex-1 rounded-md border border-slate-300 px-4 py-2"
                      onKeyPress={(e) => e.key === "Enter" && comparePrices()}
                    />
                    <button
                      onClick={comparePrices}
                      className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
                    >
                      Search
                    </button>
                  </div>
                  {comparisonResults.length > 0 && (
                    <div className="space-y-2">
                      {comparisonResults.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-slate-600">
                              Supplier: {product.supplier?.name || "Unknown"}
                            </p>
                            <p className="text-sm text-slate-600">
                              Stock: {product.stock} {product.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              ${product.price}
                            </p>
                            <button
                              onClick={() => addToCart(product)}
                              className="mt-2 rounded-md bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cart Sidebar */}
            {showCart && (
              <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50">
                <div className="bg-white w-full md:w-96 h-full shadow-xl p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  {cart.length === 0 ? (
                    <p className="text-slate-500">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-4">
                        {cart.map((item) => (
                          <div
                            key={item.product._id}
                            className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-slate-600">
                                ${item.product.price} × {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product._id,
                                    item.quantity - 1
                                  )
                                }
                                className="rounded-md bg-slate-200 px-2 py-1"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    item.product._id,
                                    item.quantity + 1
                                  )
                                }
                                className="rounded-md bg-slate-200 px-2 py-1"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="ml-2 text-red-600"
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-4">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={placeOrder}
                          className="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700"
                        >
                          Place Order
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Catalog Section */}
            <section className="mt-8">
              <h2 className="text-slate-800 text-xl font-semibold">Browse Catalog</h2>
              <div className="mt-4">
                <div className="relative flex w-full rounded-md">
                  <div className="absolute left-0 top-0 flex h-full items-center justify-center pl-4 text-slate-400">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input w-full rounded-lg border border-slate-300 bg-white h-12 pl-12 pr-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-0 focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Search for products"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mt-4 flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat === "All" ? "" : cat)}
                    className={`flex h-9 items-center rounded-full px-4 ${
                      (cat === "All" && !category) || category === cat
                        ? "bg-blue-500 text-white"
                        : "border border-slate-300 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-sm font-medium">{cat}</p>
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="mt-8 text-center">Loading...</div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{product.description}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        Supplier: {product.supplier?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-slate-500">
                        Stock: {product.stock} {product.unit}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Orders Section */}
            <section id="vendor-orders" className="mt-12">
              <h2 className="text-slate-800 text-xl font-semibold">Order Management</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Order ID
                      </th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-slate-900">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-slate-500">
                          No orders yet
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-4 py-4 text-sm font-medium text-slate-800">
                            #{order._id.slice(-6)}
                          </td>
                          <td className="px-3 py-4 text-sm text-slate-500">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm text-slate-500">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
