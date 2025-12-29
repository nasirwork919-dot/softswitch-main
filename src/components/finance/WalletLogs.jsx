import { useState } from 'react'

const WalletLogs = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [status, setStatus] = useState('')

  const walletLogs = [
    { id: 'WL-1120', user: 'Sarah Johnson', action: 'Wallet Top-up', amount: '+ Rs. 500', description: 'Added via card', status: 'Completed', date: '04 Dec 2025' },
    { id: 'WL-1120', user: 'Sarah Johnson', action: 'Wallet Top-up', amount: '+ Rs. 500', description: 'Added via card', status: 'Completed', date: '04 Dec 2025' },
    { id: 'WL-1120', user: 'Sarah Johnson', action: 'Wallet Top-up', amount: '+ Rs. 500', description: 'Added via card', status: 'Pending', date: '04 Dec 2025' },
    { id: 'WL-1120', user: 'Sarah Johnson', action: 'Wallet Top-up', amount: '+ Rs. 500', description: 'Added via card', status: 'Completed', date: '04 Dec 2025' },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium'
      case 'Pending':
        return 'bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full font-medium border border-amber-200'
      default:
        return 'bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-medium'
    }
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setDateRange('')
    setTransactionType('')
    setStatus('')
  }

  return (
    <div className="p-6">
      {/* Search & Filters Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">Search & Filters</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[280px]">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by User Name / User ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Date Range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[140px] bg-white"
          />
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[160px] bg-white"
          >
            <option value="">Transaction Type</option>
            <option value="topup">Top-up</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="transfer">Transfer</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[140px] bg-white"
          >
            <option value="">Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 text-gray-800 border border-gray-200 rounded-lg  transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">User Wallet Activities</h3>
          <p className="text-gray-500 text-sm mt-1">A complete list of User Wallet Activities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Log<br/>ID</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">User</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Action</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Description</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {walletLogs.map((log, index) => (
                <tr key={index} className={index !== walletLogs.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 px-6 text-gray-800">{log.id}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{log.user}</td>
                  <td className="py-4 px-6 text-gray-500">{log.action}</td>
                  <td className="py-4 px-6 text-gray-800">{log.amount}</td>
                  <td className="py-4 px-6 text-gray-500">{log.description}</td>
                  <td className="py-4 px-6">
                    <span className={getStatusStyle(log.status)}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Showing 1 to 2 of 1,247 results</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
              Previous
            </button>
            <button className="px-3 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium min-w-[40px]">1</button>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium min-w-[40px]">2</button>
            <button className="px-4 py-2 text-gray-800 border border-gray-200 rounded-lg text-sm font-medium ">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletLogs
