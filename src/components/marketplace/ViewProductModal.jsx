import React from "react";
import { X, Package, Tag, MapPin, Calendar } from "lucide-react";

const ViewProductModal = ({ isOpen, onClose, product, onApprove, onReject }) => {
  if (!isOpen || !product) return null;

  const handleApprove = () => {
    onApprove(product.id);
    onClose();
  };

  const handleReject = () => {
    onReject(product.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          View Product
        </h2>

        <div className="flex gap-6">
          {/* Product Image Placeholder */}
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-16 h-16 text-gray-300" />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            {/* Product Name */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {product.category} {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4">
              A {product.name.toLowerCase()} product description highlights its core features (CPU, RAM, Storage, GPU, Display, Battery), portability (lightweight design), and intended use
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-400 line-through text-sm">$44.99</span>
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
            </div>

            {/* Details Card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p className="text-sm font-medium text-gray-900">New</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-900">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">Khanpur Road RYK</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Posted On</p>
                    <p className="text-sm font-medium text-gray-900">{product.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Seller Info</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {product.seller.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.seller}</p>
                  <p className="text-xs text-gray-500">+92 3136454332</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3].map((star) => (
                      <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    {[4, 5].map((star) => (
                      <svg key={star} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleApprove}
            className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
