import { useState, useMemo } from "react";
import { Trash2, X } from "lucide-react";

// Mock data for rental listings
const initialListings = [
  { id: "#1001", title: "2 Bed Apartment", owner: "Ahmed Raza", city: "Karachi", rent: 45000, status: "Approved" },
  { id: "#1001", title: "2 Bed Apartment", owner: "Ahmed Raza", city: "Karachi", rent: 45000, status: "Pending" },
  { id: "#1001", title: "2 Bed Apartment", owner: "Ahmed Raza", city: "Karachi", rent: 45000, status: "Pending" },
  { id: "#1001", title: "2 Bed Apartment", owner: "Ahmed Raza", city: "Karachi", rent: 45000, status: "Pending" },
];

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Rejected: "bg-red-100 text-red-600",
};

const rentRanges = [
  { label: "Rent Range", min: 0, max: Infinity },
  { label: "Under 20,000", min: 0, max: 20000 },
  { label: "20,000 - 50,000", min: 20000, max: 50000 },
  { label: "50,000 - 100,000", min: 50000, max: 100000 },
  { label: "Above 100,000", min: 100000, max: Infinity },
];

const cities = ["City / Area", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"];
const statuses = ["Status", "Approved", "Pending", "Rejected"];

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

const RentalProperties = () => {
  const [listings, setListings] = useState(initialListings);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [rentRange, setRentRange] = useState("Rent Range");
  const [city, setCity] = useState("City / Area");
  const [status, setStatus] = useState("Status");

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    rentRange: "Rent Range",
    city: "City / Area",
    status: "Status",
  });

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const searchLower = appliedFilters.search.toLowerCase();
      const matchesSearch =
        appliedFilters.search === "" ||
        listing.title.toLowerCase().includes(searchLower) ||
        listing.owner.toLowerCase().includes(searchLower);

      const matchesCity =
        appliedFilters.city === "City / Area" || listing.city === appliedFilters.city;

      const matchesStatus =
        appliedFilters.status === "Status" || listing.status === appliedFilters.status;

      const selectedRange = rentRanges.find((r) => r.label === appliedFilters.rentRange);
      const matchesRent =
        !selectedRange ||
        appliedFilters.rentRange === "Rent Range" ||
        (listing.rent >= selectedRange.min && listing.rent < selectedRange.max);

      return matchesSearch && matchesCity && matchesStatus && matchesRent;
    });
  }, [listings, appliedFilters]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredListings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredListings, currentPage]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      rentRange,
      city,
      status,
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setRentRange("Rent Range");
    setCity("City / Area");
    setStatus("Status");
    setAppliedFilters({
      search: "",
      rentRange: "Rent Range",
      city: "City / Area",
      status: "Status",
    });
    setCurrentPage(1);
  };

  const handleApprove = (listing) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id && l.title === listing.title ? { ...l, status: "Approved" } : l
      )
    );
  };

  const handleReject = (listing) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id && l.title === listing.title ? { ...l, status: "Rejected" } : l
      )
    );
  };

  const handleDelete = (listing) => {
    setListings((prev) =>
      prev.filter((l) => !(l.id === listing.id && l.title === listing.title))
    );
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
              placeholder="Search by product name, category or seller..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <select
            value={rentRange}
            onChange={(e) => setRentRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {rentRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
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

      {/* Rental Listings Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Rental Listings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Listing ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Owner</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">City</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Rent</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedListings.length > 0 ? (
                paginatedListings.map((listing, index) => (
                  <tr key={`${listing.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{listing.id}</td>
                    <td className="py-4 text-sm text-gray-900">{listing.title}</td>
                    <td className="py-4 text-sm text-gray-900">{listing.owner}</td>
                    <td className="py-4 text-sm text-gray-900">{listing.city}</td>
                    <td className="py-4 text-sm text-gray-900">Rs. {listing.rent.toLocaleString()}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[listing.status]}`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {listing.status === "Approved" && (
                          <Trash2
                            className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                            onClick={() => handleDelete(listing)}
                          />
                        )}
                        {listing.status === "Pending" && (
                          <>
                            <div
                              className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer hover:bg-orange-200"
                              onClick={() => handleReject(listing)}
                            >
                              <X className="w-3 h-3 text-orange-600" />
                            </div>
                            <div
                              className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700"
                              onClick={() => handleApprove(listing)}
                            >
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No rental listings found.
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
          totalResults={filteredListings.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default RentalProperties;
