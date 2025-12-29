import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, ArrowLeft } from "lucide-react";

// Mock menu items data
const initialMenuItems = [
  { id: 1, dishName: "Chicken Biryani", category: "Desi", price: 10500, status: "Active" },
  { id: 2, dishName: "Zinger Burger", category: "Desi", price: 10500, status: "Active" },
  { id: 3, dishName: "White Karahi", category: "Desi", price: 10500, status: "Active" },
  { id: 4, dishName: "Chicken Biryani", category: "Desi", price: 10500, status: "Active" },
];

const ITEMS_PER_PAGE = 4;

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-600",
  Removed: "bg-red-100 text-red-600",
};

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

const ChefDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const chef = location.state?.chef;

  const [isBlocked, setIsBlocked] = useState(chef?.status === "Blocked");
  const [menuItems] = useState(initialMenuItems);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  const paginatedMenuItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return menuItems.slice(start, start + ITEMS_PER_PAGE);
  }, [menuItems, currentPage]);

  const handleToggleBlock = () => {
    setIsBlocked(!isBlocked);
  };

  // Default chef data if not passed via state
  const chefData = chef || {
    id: "#HCF-2211",
    name: "Chef Mariam",
    city: "Karachi",
    dishes: 4,
    rating: 4,
    status: "Active",
  };

  return (
    <div className="space-y-6 mt-8 sm:mt-28">
      {/* Back Button */}
      <button
        onClick={() => navigate("/marketplace")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Marketplace</span>
      </button>

      {/* Chef Profile Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Chef Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&crop=face"
                alt={chefData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Chef Info */}
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{chefData.name}</h2>
                <p className="text-sm text-gray-500">HCF-2211</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>+92 3465545</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span>English</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>{chefData.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={4} />
                  <span className="text-gray-500">(4.0)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <span>Email@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block/Unblock Toggle & Rating */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Block / Unblock</span>
              <button
                onClick={handleToggleBlock}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isBlocked ? "bg-gray-300" : "bg-teal-600"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isBlocked ? "left-1" : "left-7"
                  }`}
                />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Rating</p>
              <p className="text-2xl font-semibold text-gray-900">2.22k</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Total Dishes</p>
          <p className="text-2xl font-semibold text-gray-900">{chefData.dishes || 4}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Total Orders</p>
          <p className="text-2xl font-semibold text-gray-900">320+</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Most Popular Dish</p>
          <p className="text-2xl font-semibold text-gray-900">Chicken Biryani</p>
        </div>
      </div>

      {/* Uploaded Menu Items Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900">Uploaded Menu Items</h3>
        <p className="text-xs text-gray-500 mb-4">All Uploaded Menu Items by Chef {chefData.name?.replace("Chef ", "")}</p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Dish Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedMenuItems.length > 0 ? (
                paginatedMenuItems.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-900">{item.dishName}</td>
                    <td className="py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="py-4 text-sm text-gray-900">{item.price.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No menu items found.
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
          totalResults={menuItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default ChefDetails;
