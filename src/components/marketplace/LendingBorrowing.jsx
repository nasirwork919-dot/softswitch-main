import { useState, useMemo } from "react";
import { Trash2 } from "lucide-react";

// Mock data for lend & borrow items
const initialItems = [
  { id: "#1001", owner: "Sarah Johnson", itemName: "Baby Stroller", category: "Tools", dailyRent: "Rs. 200/day", status: "Active", safetyRisk: "No" },
  { id: "#1001", owner: "Sarah Johnson", itemName: "Baby Stroller", category: "Tools", dailyRent: "Rs. 200/day", status: "Active", safetyRisk: "No" },
  { id: "#1001", owner: "Sarah Johnson", itemName: "Baby Stroller", category: "Electronics", dailyRent: "10,500", status: "Removed", safetyRisk: "04 Dec 2025" },
  { id: "#1001", owner: "Sarah Johnson", itemName: "Baby Stroller", category: "Tools", dailyRent: "Rs. 200/day", status: "Active", safetyRisk: "Yes" },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Removed: "bg-red-100 text-red-600",
};

const categories = ["Item Category", "Tools", "Electronics", "Furniture", "Sports", "Baby Items"];
const cities = ["City", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"];
const statuses = ["All Status", "Active", "Pending", "Removed"];

const ITEMS_PER_PAGE = 4;

const Pagination = ({ currentPage, totalPages, onPageChange, totalResults, itemsPerPage }) => {
  const startItem = totalResults > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="mt-6 flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalResults.toLocaleString()} results
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(page)}
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
          onClick={() => onPageChange(currentPage + 1)}
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
  );
};

const LendingBorrowing = () => {
  const [items, setItems] = useState(initialItems);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Item Category");
  const [city, setCity] = useState("City");
  const [status, setStatus] = useState("All Status");

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    category: "Item Category",
    city: "City",
    status: "All Status",
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchLower = appliedFilters.search.toLowerCase();
      const matchesSearch =
        appliedFilters.search === "" ||
        item.itemName.toLowerCase().includes(searchLower) ||
        item.owner.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower);

      const matchesCategory =
        appliedFilters.category === "Item Category" || item.category === appliedFilters.category;

      const matchesStatus =
        appliedFilters.status === "All Status" || item.status === appliedFilters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, appliedFilters]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      category,
      city,
      status,
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("Item Category");
    setCity("City");
    setStatus("All Status");
    setAppliedFilters({
      search: "",
      category: "Item Category",
      city: "City",
      status: "All Status",
    });
    setCurrentPage(1);
  };

  const handleDelete = (index) => {
    const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    setItems((prev) => prev.filter((_, i) => i !== actualIndex));
  };

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Search & Filters</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, category"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[120px] cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
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

      {/* Lend & Borrow Items Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">Lend & Borrow Items</h3>
        <p className="text-xs text-gray-500 mb-4">A complete list of Lend & Borrow Items</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Item ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Owner</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Item Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Daily Rent</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Safety Risk</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="py-4 text-sm text-gray-900">{item.owner}</td>
                    <td className="py-4 text-sm text-gray-900">{item.itemName}</td>
                    <td className="py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="py-4 text-sm text-gray-900">{item.dailyRent}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-900">{item.safetyRisk}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Trash2
                          className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={filteredItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default LendingBorrowing;
