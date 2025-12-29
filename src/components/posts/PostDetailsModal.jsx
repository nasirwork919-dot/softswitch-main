import React from "react";
import { Heart, MessageCircle, Share2, X } from "lucide-react";

const PostDetailsModal = ({ open, onClose, post }) => {
  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Post Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
          <div>
            <p className="font-semibold">Post ID</p>
            <p>{post.id}</p>
          </div>

          <div>
            <p className="font-semibold">Posted By</p>
            <p>User</p>
          </div>

          <div>
            <p className="font-semibold">Community</p>
            <p>{post.community}</p>
          </div>

          <div>
            <p className="font-semibold">Post Type</p>
            <p>{post.type}</p>
          </div>

          <div>
            <p className="font-semibold">Posted On</p>
            <p>{post.date}</p>
          </div>

          <div>
            <p className="font-semibold">Status</p>
            <p className="capitalize">{post.status}</p>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Post preview</h3>

        {/* Preview Card */}
        <div className="border border-gray-200 rounded-xl p-4 mb-4 text-sm text-gray-600">
          <p className="mb-4">
            A post description (or caption) is the text accompanying an image,
            video, or article summarizing content and adding context.
          </p>

          <img
            src="https://picsum.photos/600/300"
            className="w-full h-56 object-cover rounded-xl"
            alt="preview"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-gray-700 mb-6">
          <div className="flex items-center gap-2">
            <span><Heart /></span> <p>24</p>
          </div>
          <div className="flex items-center gap-2">
            <span><MessageCircle /></span> <p>8</p>
          </div>
          <div className="flex items-center gap-2">
            <span><Share2 /></span> <p>8</p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg">
            Hide Post
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
            Delete Post
          </button>
          <button
            onClick={onClose}
            className="border border-gray-200 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsModal;
