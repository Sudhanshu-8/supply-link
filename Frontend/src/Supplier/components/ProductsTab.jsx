import React from "react";

const ProductsTab = ({ 
  products, 
  loading, 
  error,
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Product Listings</h2>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <span className="material-symbols-outlined text-base">add</span>
          New Product
        </button>
      </div>

      {error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : loading && products.length === 0 ? (
        <div className="text-center py-8">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products yet. Create your first product!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${
                  product.isActive
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${product.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description || "No description"}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-bold text-blue-600">${product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stock:</span>
                  <span className="font-medium text-gray-900">
                    {product.stock} {product.unit}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditProduct(product)}
                  className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProduct(product._id)}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsTab;

