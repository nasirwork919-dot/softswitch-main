import React, { useState, useMemo } from "react";
import { Eye, Trash2, Flag } from "lucide-react";
import FlagSellerModal from "./FlagSellerModal";
import ViewProductModal from "./ViewProductModal";

const initialProducts = [
  {
    id: "#1001",
    seller: "Sarah Johnson",
    name: "Baby Stroller",
    category: "Electronics",
    price: "10,500",
    status: "Approved",
    date: "04 Dec 2025",
  },
  {
    id: "#1002",
    seller: "John Smith",
    name: "Laptop Stand",
    category: "Electronics",
    price: "2,500",
    status: "Removed",
    date: "03 Dec 2025",
  },
  {
    id: "#1003",
    seller: "Emily Davis",
    name: "Kitchen Mixer",
    category: "Home Appliances",
    price: "8,000",
    status: "Pending",
    date: "02 Dec 2025",
  },
  {
    id: "#1004",
    seller: "Michael Brown",
    name: "Gaming Chair",
    category: "Furniture",
    price: "15,000",
    status: "Approved",
    date: "01 Dec 2025",
  },
  {
    id: "#1005",
    seller: "Sarah Johnson",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "5,500",
    status: "Pending",
    date: "30 Nov 2025",
  },
  {
    id: "#1006",
    seller: "Lisa Wilson",
    name: "Coffee Table",
    category: "Furniture",
    price: "12,000",
    status: "Approved",
    date: "29 Nov 2025",
  },
  {
    id: "#1007",
    seller: "David Lee",
    name: "Blender",
    category: "Home Appliances",
    price: "3,500",
    status: "Removed",
    date: "28 Nov 2025",
  },
  {
    id: "#1008",
    seller: "Emma Taylor",
    name: "Smart Watch",
    category: "Electronics",
    price: "25,000",
    status: "Approved",
    date: "27 Nov 2025",
  },
];

const categories = ["All Categories", "Electronics", "Home Appliances", "Furniture"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 5,000", min: 0, max: 5000 },
  { label: "5,000 - 10,000", min: 5000, max: 10000 },
  { label: "10,000 - 20,000", min: 10000, max: 20000 },
  { label: "Above 20,000", min: 20000, max: Infinity },
];
const statuses = ["All Status", "Approved", "Pending", "Removed"];

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Removed: "bg-red-100 text-red-600",
};

const ITEMS_PER_PAGE = 4;

const ActionsByStatus = ({ status, onView, onDelete, onFlag }) => {
  if (status === "Approved") {
    return (
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700" onClick={onView} />
        <Trash2 className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" onClick={onDelete} />
      </div>
    );
  }

  if (status === "Pending") {
    return (
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700" onClick={onView} />
        <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700" onClick={onDelete}>
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Flag className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" onClick={onFlag} />
      </div>
    );
  }

  // Removed status
  return (
    <div className="flex items-center gap-2">
      <Eye className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700" onClick={onView} />
    </div>
  );
};

const MarketplaceListings = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Temporary filter states (for Apply Filters button)
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [tempCategory, setTempCategory] = useState("All Categories");
  const [tempPriceRange, setTempPriceRange] = useState("All Prices");
  const [tempStatus, setTempStatus] = useState("All Status");

  // Parse price string to number
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/,/g, ""), 10);
  };

  // Filter products based on applied filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.seller.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;

      // Price filter
      const priceRange = priceRanges.find((p) => p.label === selectedPriceRange);
      const productPrice = parsePrice(product.price);
      const matchesPrice =
        selectedPriceRange === "All Prices" ||
        (productPrice >= priceRange.min && productPrice < priceRange.max);

      // Status filter
      const matchesStatus =
        selectedStatus === "All Status" || product.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedPriceRange, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Apply filters
  const handleApplyFilters = () => {
    setSearchQuery(tempSearchQuery);
    setSelectedCategory(tempCategory);
    setSelectedPriceRange(tempPriceRange);
    setSelectedStatus(tempStatus);
    setCurrentPage(1);
  };

  // Clear filters
  const handleClearFilters = () => {
    setTempSearchQuery("");
    setTempCategory("All Categories");
    setTempPriceRange("All Prices");
    setTempStatus("All Status");
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedPriceRange("All Prices");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  // Modal handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const handleFlagSeller = (product) => {
    setSelectedProduct(product);
    setFlagModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleFlagSubmit = (reason) => {
    console.log(`Flagged seller ${selectedProduct?.seller} for: ${reason}`);
    // Here you would typically make an API call to flag the seller
  };

  const handleApproveProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Approved" } : p))
    );
  };

  const handleRejectProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Removed" } : p))
    );
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Search & Filters
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 min-w-[280px]">
            <input
              type="text"
              value={tempSearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
              placeholder="Search by product name, category or seller..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={tempCategory}
            onChange={(e) => setTempCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All Categories" ? "Category" : cat}
              </option>
            ))}
          </select>

          {/* Price Range Dropdown */}
          <select
            value={tempPriceRange}
            onChange={(e) => setTempPriceRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label === "All Prices" ? "Price Range" : range.label}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[120px] cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">
          All Marketplace Products
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          A complete list of products
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Product ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Seller</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Item Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Posted On</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="py-4 text-sm text-gray-900">{item.seller}</td>
                    <td className="py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="py-4 text-sm text-gray-900">{item.price}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{item.date}</td>
                    <td className="py-4">
                      <ActionsByStatus
                        status={item.status}
                        onView={() => handleViewProduct(item)}
                        onDelete={() => handleDeleteProduct(item.id)}
                        onFlag={() => handleFlagSeller(item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
            {filteredProducts.length.toLocaleString()} results
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-1.5 text-sm border border-gray-300 rounded-md ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed bg-white"
                  : "text-gray-700 hover:bg-gray-50 bg-white"
              }`}
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1.5 text-sm rounded-md ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-1.5 text-sm border border-gray-300 rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-300 cursor-not-allowed bg-white"
                  : "text-gray-700 hover:bg-gray-50 bg-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FlagSellerModal
        isOpen={flagModalOpen}
        onClose={() => setFlagModalOpen(false)}
        seller={selectedProduct?.seller}
        onSubmit={handleFlagSubmit}
      />

      <ViewProductModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        product={selectedProduct}
        onApprove={handleApproveProduct}
        onReject={handleRejectProduct}
      />
    </div>
  );
};

export default MarketplaceListings;
