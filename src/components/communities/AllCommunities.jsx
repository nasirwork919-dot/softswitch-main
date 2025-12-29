import React, { useState, useMemo } from 'react'
import { Search, Pen, Trash2, CheckCircle, CirclePlus } from 'lucide-react'
import DeleteCommunityModal from './DeleteCommunityModal'
import DeactivateCommunityModal from './DeactivateCommunityModal'
import ActivateCommunityModal from './ActivateCommunityModal'
import { Link } from 'react-router-dom'

const AllCommunities = () => {
  // Sample data
  const communities = [
    {
      id: 'CM-1001',
      name: 'Downtown Manhattan',
      location: 'Midtown West',
      city: 'New York',
      totalUsers: 2456,
      totalPosts: 1284,
      totalEvents: 89,
      status: 'Active',
    },
    {
      id: 'CM-1002',
      name: 'Beverly Hills',
      location: 'West Hollywood',
      city: 'Los Angeles',
      totalUsers: 3892,
      totalPosts: 2145,
      totalEvents: 124,
      status: 'Active',
    },
    {
      id: 'CM-1003',
      name: 'Lincoln Park',
      location: 'North Side',
      city: 'Chicago',
      totalUsers: 1567,
      totalPosts: 892,
      totalEvents: 56,
      status: 'Inactive',
    },
    {
      id: 'CM-1004',
      name: 'Brooklyn Heights',
      location: 'Downtown Brooklyn',
      city: 'New York',
      totalUsers: 4234,
      totalPosts: 2678,
      totalEvents: 156,
      status: 'Active',
    },
    {
      id: 'CM-1005',
      name: 'Santa Monica',
      location: 'Westside',
      city: 'Los Angeles',
      totalUsers: 2891,
      totalPosts: 1567,
      totalEvents: 98,
      status: 'Active',
    },
    {
      id: 'CM-1006',
      name: 'Upper East Side',
      location: 'Manhattan',
      city: 'New York',
      totalUsers: 5123,
      totalPosts: 3456,
      totalEvents: 201,
      status: 'Active',
    },
    {
      id: 'CM-1007',
      name: 'Wicker Park',
      location: 'West Town',
      city: 'Chicago',
      totalUsers: 1890,
      totalPosts: 1023,
      totalEvents: 67,
      status: 'Inactive',
    },
    {
      id: 'CM-1008',
      name: 'Venice Beach',
      location: 'Westside',
      city: 'Los Angeles',
      totalUsers: 3456,
      totalPosts: 2234,
      totalEvents: 145,
      status: 'Active',
    },
  ]

  // Filter states
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, community: null })
  const [deactivateModal, setDeactivateModal] = useState({ isOpen: false, community: null })
  const [activateModal, setActivateModal] = useState({ isOpen: false, community: null })

  // Get unique cities for filter dropdown
  const uniqueCities = useMemo(() => {
    return [...new Set(communities.map(c => c.city))]
  }, [])

  // Filtered communities
  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesSearch =
        community.name.toLowerCase().includes(searchText.toLowerCase()) ||
        community.city.toLowerCase().includes(searchText.toLowerCase()) ||
        community.location.toLowerCase().includes(searchText.toLowerCase())

      const matchesStatus = statusFilter === '' || community.status === statusFilter
      const matchesCity = cityFilter === '' || community.city === cityFilter

      return matchesSearch && matchesStatus && matchesCity
    })
  }, [searchText, statusFilter, cityFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCommunities = filteredCommunities.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1)
  }

  const handleCityChange = (e) => {
    setCityFilter(e.target.value)
    setCurrentPage(1)
  }

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Modal handlers
  const openDeleteModal = (community) => {
    setDeleteModal({ isOpen: true, community })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, community: null })
  }

  const handleDeleteConfirm = () => {
    console.log('Delete community:', deleteModal.community)
    closeDeleteModal()
  }

  const openDeactivateModal = (community) => {
    setDeactivateModal({ isOpen: true, community })
  }

  const closeDeactivateModal = () => {
    setDeactivateModal({ isOpen: false, community: null })
  }

  const handleDeactivateConfirm = () => {
    console.log('Deactivate community:', deactivateModal.community)
    closeDeactivateModal()
  }

  const openActivateModal = (community) => {
    setActivateModal({ isOpen: true, community })
  }

  const closeActivateModal = () => {
    setActivateModal({ isOpen: false, community: null })
  }

  const handleActivateConfirm = () => {
    console.log('Activate community:', activateModal.community)
    closeActivateModal()
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3)
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      }
    }

    return pages
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Communities</h2>
        <p className="text-sm text-gray-500 mt-1">
          A complete list of all communities created on the platform.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by community name or city..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={handleCityChange}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white min-w-[140px]"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">
                Community ID
              </th>
              <th className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">
                Community Name
              </th>
              <th className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">
                Location
              </th>
              <th className="p-3 text-left font-medium text-gray-600 whitespace-nowrap">City</th>
              <th className="p-3 text-center font-medium text-gray-600 whitespace-nowrap">
                Total Users
              </th>
              <th className="p-3 text-center font-medium text-gray-600 whitespace-nowrap">
                Total Posts
              </th>
              <th className="p-3 text-center font-medium text-gray-600 whitespace-nowrap">
                Total Events
              </th>
              <th className="p-3 text-center font-medium text-gray-600 whitespace-nowrap">
                Status
              </th>
              <th className="p-3 text-center font-medium text-gray-600 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentCommunities.length > 0 ? (
              currentCommunities.map((community) => (
                <tr
                  key={community.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-gray-600 font-medium">#{community.id}</td>
                  <td className="p-3 text-gray-900 font-medium">{community.name}</td>
                  <td className="p-3 text-gray-600">{community.location}</td>
                  <td className="p-3 text-gray-600">{community.city}</td>
                  <td className="p-3 text-center text-gray-600">
                    {community.totalUsers.toLocaleString()}
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {community.totalPosts.toLocaleString()}
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {community.totalEvents.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        community.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {community.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link to='/communities/edit&create'>
                      <button
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Pen size={16} />
                      </button>
                      </Link>
                      <button
                         onClick={() => openDeleteModal(community)}
                        className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Deactivate"
                      >
                        <Trash2 size={16} />
                      </button>
                      {community.status === 'Active' ? (
                        <button
                          onClick={() => openDeactivateModal(community)}
                          className="p-1.5 text-[#03989E]   hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                           <CirclePlus size={16} className='rotate-45'/>
                        </button>
                      ) : (
                        <button
                          onClick={() => openActivateModal(community)}
                          className="p-1.5 text-[#03989E]  hover:bg-green-50 rounded transition-colors"
                          title="Activate"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">
                  No communities found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600">
          Showing {filteredCommunities.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(endIndex, filteredCommunities.length)} of {filteredCommunities.length}{' '}
          communities
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <DeleteCommunityModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        communityName={deleteModal.community?.name}
      />

      <DeactivateCommunityModal
        isOpen={deactivateModal.isOpen}
        onClose={closeDeactivateModal}
        onConfirm={handleDeactivateConfirm}
        communityName={deactivateModal.community?.name}
      />

      <ActivateCommunityModal
        isOpen={activateModal.isOpen}
        onClose={closeActivateModal}
        onConfirm={handleActivateConfirm}
        communityName={activateModal.community?.name}
      />
    </div>
  )
}

export default AllCommunities
