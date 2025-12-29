import { useState, useMemo } from "react";
import { Eye, X, Trash2, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlockChefModal from "./BlockChefModal";

// ============ MOCK DATA ============
const initialChefs = [
  { id: "#1001", name: "Chef Mariam", city: "Karachi", dishes: 12, rating: "⭐⭐⭐⭐⭐", status: "Active" },
  { id: "#1001", name: "Chef Mariam", city: "Karachi", dishes: 12, rating: "⭐⭐⭐⭐⭐", status: "Active" },
  { id: "#1001", name: "Chef Mariam", city: "Karachi", dishes: 12, rating: "⭐⭐⭐⭐", status: "Under Review" },
  { id: "#1001", name: "Chef Mariam", city: "Karachi", dishes: 12, rating: "⭐⭐⭐⭐", status: "Under Review" },
];

const initialMenuItems = [
  { id: "#1001", dishName: "Chicken Biryani", chef: "Chef Mariam", price: "Rs. 350", category: "Desi", status: "Active" },
  { id: "#1001", dishName: "Chicken Biryani", chef: "Chef Mariam", price: "Rs. 350", category: "Desi", status: "Active" },
  { id: "#1001", dishName: "Chicken Biryani", chef: "Chef Mariam", price: "Rs. 260", category: "Desi", status: "Pending" },
  { id: "#1001", dishName: "Chicken Biryani", chef: "Chef Mariam", price: "Rs. 290", category: "Desi", status: "Pending" },
];

const initialComplaints = [
  { id: "#1001", item: "Chicken Biryani", submittedBy: "Ali Khan", chef: "Chef Mariam", issueType: "Food Quality", status: "Pending" },
  { id: "#1001", item: "Chicken Biryani", submittedBy: "Ali Khan", chef: "Chef Mariam", issueType: "Food Quality", status: "Resolved" },
  { id: "#1001", item: "Chicken Biryani", submittedBy: "Ali Khan", chef: "Chef Mariam", issueType: "Food Quality", status: "Pending" },
  { id: "#1001", item: "Chicken Biryani", submittedBy: "Ali Khan", chef: "Chef Mariam", issueType: "Food Quality", status: "Under Review" },
];

// ============ STATUS STYLES ============
const chefStatusStyles = {
  Active: "bg-green-100 text-green-700",
  "Under Review": "bg-orange-100 text-orange-600",
  Blocked: "bg-red-100 text-red-600",
};

const menuStatusStyles = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Removed: "bg-red-100 text-red-600",
};

const complaintStatusStyles = {
  Pending: "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-700",
  "Under Review": "bg-orange-100 text-orange-600",
};

// ============ FILTER OPTIONS ============
const categories = ["Category", "Desi", "Fast Food", "Chinese", "Italian"];
const priceRanges = [
  { label: "Price Range", min: 0, max: Infinity },
  { label: "Under 200", min: 0, max: 200 },
  { label: "200 - 400", min: 200, max: 400 },
  { label: "400 - 600", min: 400, max: 600 },
  { label: "Above 600", min: 600, max: Infinity },
];
const statuses = ["All Status", "Active", "Pending", "Under Review", "Blocked", "Resolved"];

const ITEMS_PER_PAGE = 4;

// ============ REUSABLE COMPONENTS ============
const StarRating = ({ rating }) => {
  const stars = rating || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= stars ? "text-yellow-400" : "text-gray-300"} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

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

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  status,
  onStatusChange,
  onApply,
  onClear,
  showPriceFilter = true,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Search & Filters</h3>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[280px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product name, category or seller..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
        </div>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {showPriceFilter && (
          <select
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[140px] cursor-pointer"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>{range.label}</option>
            ))}
          </select>
        )}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white min-w-[120px] cursor-pointer"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onApply}
          className="px-4 py-2 text-sm rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

// ============ MAIN COMPONENT ============
const HomeFoodMarket = () => {
  const navigate = useNavigate();

  // Chefs State
  const [chefs, setChefs] = useState(initialChefs);
  const [chefsPage, setChefsPage] = useState(1);
  const [chefsSearch, setChefsSearch] = useState("");
  const [chefsCategory, setChefsCategory] = useState("Category");
  const [chefsPriceRange, setChefsPriceRange] = useState("Price Range");
  const [chefsStatus, setChefsStatus] = useState("All Status");
  const [appliedChefsFilters, setAppliedChefsFilters] = useState({
    search: "",
    category: "Category",
    priceRange: "Price Range",
    status: "All Status",
  });

  // Menu Items State
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [menuPage, setMenuPage] = useState(1);
  const [appliedMenuFilters, setAppliedMenuFilters] = useState({
    search: "",
    category: "Category",
    priceRange: "Price Range",
    status: "All Status",
  });

  // Complaints State
  const [complaints, setComplaints] = useState(initialComplaints);
  const [complaintsPage, setComplaintsPage] = useState(1);
  const [appliedComplaintsFilters, setAppliedComplaintsFilters] = useState({
    search: "",
    category: "Category",
    priceRange: "Price Range",
    status: "All Status",
  });

  // Modal State
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState(null);

  // ============ FILTERED DATA ============
  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const searchLower = appliedChefsFilters.search.toLowerCase();
      const matchesSearch =
        appliedChefsFilters.search === "" ||
        chef.name.toLowerCase().includes(searchLower) ||
        chef.city.toLowerCase().includes(searchLower);
      const matchesStatus =
        appliedChefsFilters.status === "All Status" ||
        chef.status === appliedChefsFilters.status;
      return matchesSearch && matchesStatus;
    });
  }, [chefs, appliedChefsFilters]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const searchLower = appliedMenuFilters.search.toLowerCase();
      const matchesSearch =
        appliedMenuFilters.search === "" ||
        item.dishName.toLowerCase().includes(searchLower) ||
        item.chef.toLowerCase().includes(searchLower);
      const matchesCategory =
        appliedMenuFilters.category === "Category" ||
        item.category === appliedMenuFilters.category;
      const matchesStatus =
        appliedMenuFilters.status === "All Status" ||
        item.status === appliedMenuFilters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [menuItems, appliedMenuFilters]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchLower = appliedComplaintsFilters.search.toLowerCase();
      const matchesSearch =
        appliedComplaintsFilters.search === "" ||
        complaint.item.toLowerCase().includes(searchLower) ||
        complaint.chef.toLowerCase().includes(searchLower) ||
        complaint.submittedBy.toLowerCase().includes(searchLower);
      const matchesStatus =
        appliedComplaintsFilters.status === "All Status" ||
        complaint.status === appliedComplaintsFilters.status;
      return matchesSearch && matchesStatus;
    });
  }, [complaints, appliedComplaintsFilters]);

  // ============ PAGINATED DATA ============
  const paginatedChefs = useMemo(() => {
    const start = (chefsPage - 1) * ITEMS_PER_PAGE;
    return filteredChefs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredChefs, chefsPage]);

  const paginatedMenuItems = useMemo(() => {
    const start = (menuPage - 1) * ITEMS_PER_PAGE;
    return filteredMenuItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMenuItems, menuPage]);

  const paginatedComplaints = useMemo(() => {
    const start = (complaintsPage - 1) * ITEMS_PER_PAGE;
    return filteredComplaints.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredComplaints, complaintsPage]);

  // ============ HANDLERS ============
  const handleBlockChef = (chef) => {
    setSelectedChef(chef);
    setBlockModalOpen(true);
  };

  const handleBlockSubmit = (reason) => {
    if (selectedChef) {
      setChefs((prev) =>
        prev.map((c) =>
          c.id === selectedChef.id && c.name === selectedChef.name
            ? { ...c, status: "Blocked" }
            : c
        )
      );
      console.log(`Blocked ${selectedChef.name} for: ${reason}`);
    }
  };

  const handleApproveChef = (chef) => {
    setChefs((prev) =>
      prev.map((c) =>
        c.id === chef.id && c.name === chef.name ? { ...c, status: "Active" } : c
      )
    );
  };

  const handleRejectChef = (chef) => {
    setChefs((prev) =>
      prev.map((c) =>
        c.id === chef.id && c.name === chef.name ? { ...c, status: "Blocked" } : c
      )
    );
  };

  const handleApproveMenuItem = (item) => {
    setMenuItems((prev) =>
      prev.map((m) =>
        m.id === item.id && m.dishName === item.dishName ? { ...m, status: "Active" } : m
      )
    );
  };

  const handleDeleteMenuItem = (item) => {
    setMenuItems((prev) =>
      prev.filter((m) => !(m.id === item.id && m.dishName === item.dishName))
    );
  };

  const handleResolveComplaint = (complaint) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaint.id && c.item === complaint.item ? { ...c, status: "Resolved" } : c
      )
    );
  };

  // ============ RENDER ============
  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <SearchFilters
        searchQuery={chefsSearch}
        onSearchChange={setChefsSearch}
        category={chefsCategory}
        onCategoryChange={setChefsCategory}
        priceRange={chefsPriceRange}
        onPriceRangeChange={setChefsPriceRange}
        status={chefsStatus}
        onStatusChange={setChefsStatus}
        onApply={() => {
          const filters = {
            search: chefsSearch,
            category: chefsCategory,
            priceRange: chefsPriceRange,
            status: chefsStatus,
          };
          setAppliedChefsFilters(filters);
          setAppliedMenuFilters(filters);
          setAppliedComplaintsFilters(filters);
          setChefsPage(1);
          setMenuPage(1);
          setComplaintsPage(1);
        }}
        onClear={() => {
          const defaultFilters = { search: "", category: "Category", priceRange: "Price Range", status: "All Status" };
          setChefsSearch("");
          setChefsCategory("Category");
          setChefsPriceRange("Price Range");
          setChefsStatus("All Status");
          setAppliedChefsFilters(defaultFilters);
          setAppliedMenuFilters(defaultFilters);
          setAppliedComplaintsFilters(defaultFilters);
          setChefsPage(1);
          setMenuPage(1);
          setComplaintsPage(1);
        }}
      />

      {/* Home Chefs List Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">Home Chefs List</h3>
        <p className="text-xs text-gray-500 mb-4">A complete list of Home Chefs List</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Chef ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">City</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Dishes Listed</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedChefs.length > 0 ? (
                paginatedChefs.map((chef, index) => (
                  <tr key={`${chef.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{chef.id}</td>
                    <td className="py-4 text-sm text-gray-900">{chef.name}</td>
                    <td className="py-4 text-sm text-gray-900">{chef.city}</td>
                    <td className="py-4 text-sm text-gray-900">{chef.dishes}</td>
                    <td className="py-4">
                      <StarRating rating={chef.rating?.length || 5} />
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${chefStatusStyles[chef.status]}`}>
                        {chef.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Eye
                          className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700"
                          onClick={() => navigate("/marketplace/chef", { state: { chef } })}
                        />
                        {chef.status === "Active" && (
                          <UserX
                            className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                            onClick={() => handleBlockChef(chef)}
                          />
                        )}
                        {chef.status === "Under Review" && (
                          <>
                            <div
                              className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700"
                              onClick={() => handleApproveChef(chef)}
                            >
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div
                              className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600"
                              onClick={() => handleRejectChef(chef)}
                            >
                              <X className="w-2.5 h-2.5 text-white" />
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">No chefs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={chefsPage}
          totalPages={Math.ceil(filteredChefs.length / ITEMS_PER_PAGE)}
          onPageChange={setChefsPage}
          totalResults={filteredChefs.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      {/* Menu Items Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">Menu Items</h3>
        <p className="text-xs text-gray-500 mb-4">A complete list of Menu Items</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Dish Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Chef</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedMenuItems.length > 0 ? (
                paginatedMenuItems.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="py-4 text-sm text-gray-900">{item.dishName}</td>
                    <td className="py-4 text-sm text-gray-900">{item.chef}</td>
                    <td className="py-4 text-sm text-gray-900">{item.price}</td>
                    <td className="py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${menuStatusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700" />
                        {item.status === "Pending" && (
                          <div
                            className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700"
                            onClick={() => handleApproveMenuItem(item)}
                          >
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <Trash2
                          className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
                          onClick={() => handleDeleteMenuItem(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">No menu items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={menuPage}
          totalPages={Math.ceil(filteredMenuItems.length / ITEMS_PER_PAGE)}
          onPageChange={setMenuPage}
          totalResults={filteredMenuItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      {/* Complaints (Food Market) Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">Complaints (Food Market)</h3>
        <p className="text-xs text-gray-500 mb-4">A complete list of Complaints (Food Market)</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Complaint ID</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Item</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Submitted By</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Chef</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Issue Type</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedComplaints.length > 0 ? (
                paginatedComplaints.map((complaint, index) => (
                  <tr key={`${complaint.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{complaint.id}</td>
                    <td className="py-4 text-sm text-gray-900">{complaint.item}</td>
                    <td className="py-4 text-sm text-gray-900">{complaint.submittedBy}</td>
                    <td className="py-4 text-sm text-gray-900">{complaint.chef}</td>
                    <td className="py-4 text-sm text-gray-900">{complaint.issueType}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${complaintStatusStyles[complaint.status]}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 cursor-pointer text-teal-600 hover:text-teal-700" />
                        {complaint.status !== "Resolved" && (
                          <div
                            className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center cursor-pointer hover:bg-teal-700"
                            onClick={() => handleResolveComplaint(complaint)}
                          >
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={complaintsPage}
          totalPages={Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE)}
          onPageChange={setComplaintsPage}
          totalResults={filteredComplaints.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      {/* Block Chef Modal */}
      <BlockChefModal
        isOpen={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        chefName={selectedChef?.name}
        onSubmit={handleBlockSubmit}
      />
    </div>
  );
};

export default HomeFoodMarket;
