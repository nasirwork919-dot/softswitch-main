import { useState } from 'react'

const RefundRequests = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [status, setStatus] = useState('')

  const [refundRequests, setRefundRequests] = useState([
    { id: 'RF-2211', user: 'Sarah Johnson', requestedOn: '03 Dec 2025', amount: '+ Rs. 500', reason: 'Item not delivered', status: 'Approved' },
    { id: 'RF-2211', user: 'Sarah Johnson', requestedOn: '03 Dec 2025', amount: '+ Rs. 500', reason: 'Item not delivered', status: 'Pending' },
    { id: 'RF-2211', user: 'Sarah Johnson', requestedOn: '03 Dec 2025', amount: '+ Rs. 500', reason: 'Item not delivered', status: 'Pending' },
    { id: 'RF-2211', user: 'Sarah Johnson', requestedOn: '03 Dec 2025', amount: '+ Rs. 500', reason: 'Item not delivered', status: 'Pending' },
  ])

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium'
      case 'Pending':
        return 'bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full font-medium border border-amber-200'
      case 'Rejected':
        return 'bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium'
      default:
        return 'bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-medium'
    }
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setPaymentMethod('')
    setTransactionType('')
    setStatus('')
  }

  const handleApprove = (index) => {
    setRefundRequests(prev =>
      prev.map((refund, i) =>
        i === index ? { ...refund, status: 'Approved' } : refund
      )
    )
  }

  const handleReject = (index) => {
    setRefundRequests(prev =>
      prev.map((refund, i) =>
        i === index ? { ...refund, status: 'Rejected' } : refund
      )
    )
  }

  return (
    <div className="p-6">
      {/* Search & Filters Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-5">Search & Filters</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] max-w-[240px]">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[160px] bg-white"
          >
            <option value="">Payment Method</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="bank">Bank Transfer</option>
          </select>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[160px] bg-white"
          >
            <option value="">Transaction Type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[140px] bg-white"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium">
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Refund Center</h3>
          <p className="text-gray-500 text-sm mt-1">A complete list of Refund Center</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Refund<br/>ID</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">User</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Requested On</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Reason</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refundRequests.map((refund, index) => (
                <tr key={index} className={index !== refundRequests.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 px-6 text-gray-800">{refund.id}</td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{refund.user}</td>
                  <td className="py-4 px-6 text-gray-500">{refund.requestedOn}</td>
                  <td className="py-4 px-6 text-gray-800">{refund.amount}</td>
                  <td className="py-4 px-6 text-gray-500">{refund.reason}</td>
                  <td className="py-4 px-6">
                    <span className={getStatusStyle(refund.status)}>
                      {refund.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {refund.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(index)}
                          className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded font-medium hover:bg-emerald-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(index)}
                          className="px-3 py-1.5 bg-red-500 text-white text-xs rounded font-medium hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
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
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default RefundRequests
