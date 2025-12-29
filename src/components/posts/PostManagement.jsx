import React, { useState } from "react";
import { Eye, EyeOff, Flag, Trash2, MoreVertical } from "lucide-react";
import PostDetailsModal from "./PostDetailsModal";
import FlagUserModal from "./FlagUserModal";

const PostManagement = () => {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("");
  const [postType, setPostType] = useState("");
  const [status, setStatus] = useState("");
  const [verification, setVerification] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

  const posts = [
    {
      id: "#1001",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/40",
      community: "Fitness & health",
      type: "Text",
      date: "2-2-2024",
      status: "Visible",
    },
    {
      id: "#1002",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/41",
      community: "Fitness & health",
      type: "Text",
      date: "2-2-2024",
      status: "Visible",
    },
  ];

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
    setOpenMenu(null);
  };

  const openFlagModal = (post) => {
    setSelectedPost(post);
    setIsFlagModalOpen(true);
    setOpenMenu(null);
  };

  const filteredPosts = posts.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (community ? p.community === community : true) &&
      (postType ? p.type === postType : true) &&
      (status ? p.status === status : true)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      {/* SEARCH & FILTERS CARD */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Search & Filters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select Community</option>
            <option value="Fitness & health">Fitness & health</option>
          </select>

          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">By Post Type</option>
            <option value="Text">Text</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">By Status</option>
            <option value="Visible">Visible</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
          <select
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm sm:w-56 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">All Verification</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="flex gap-3">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm transition">
              Apply
            </button>
            <button
              onClick={() => {
                setSearch("");
                setCommunity("");
                setPostType("");
                setStatus("");
                setVerification("");
              }}
              className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-lg text-sm transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* POSTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold">All Posts</h2>

        {/* RESPONSIVE TABLE */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 text-gray-600">
                <th className="p-3 text-left">Post ID</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Community</th>
                <th className="p-3 text-left">Post Type</th>
                <th className="p-3 text-left">Posted On</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{post.id}</td>

                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        className="w-9 h-9 rounded-lg object-cover"
                        alt="user"
                      />
                      <span className="font-medium">{post.name}</span>
                    </div>
                  </td>

                  <td className="p-3 whitespace-nowrap">{post.community}</td>
                  <td className="p-3">{post.type}</td>
                  <td className="p-3">{post.date}</td>

                  <td className="p-3">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      {post.status}
                    </span>
                  </td>

                  <td className="p-3 relative">
                    <button
                      onClick={() => toggleMenu(post.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === post.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-lg z-20">
                        <button
                          onClick={() => openPostModal(post)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                        >
                          <Eye size={16} /> View Post
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
                          <EyeOff size={16} /> Hide
                        </button>

                        <button
                          onClick={() => openFlagModal(post)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
                        >
                          <Flag size={16} /> Flag User
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 w-full">
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Showing {filteredPosts.length} results
        </p>
      </div>

      {/* MODALS */}
      <PostDetailsModal
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={selectedPost}
      />

      <FlagUserModal
        open={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        onSubmit={(reason) => {
          console.log("Flag reason:", reason);
          setIsFlagModalOpen(false);
        }}
      />
    </div>
  );
};

export default PostManagement;
