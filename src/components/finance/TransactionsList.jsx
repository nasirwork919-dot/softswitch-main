import { useState } from 'react'

const TransactionsList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [status, setStatus] = useState('')

  const transactions = [
    { id: 'TXN-91021', user: 'Ali Raza', avatar: '/avatars/ali.jpg', amount: 'Rs. 1,200', type: 'Credit', method: 'Card', date: '04 Dec 2025', status: 'Success' },
    { id: 'TXN-91022', user: 'Rabia Fatima', avatar: '/avatars/rabia.jpg', amount: 'Rs. 700', type: 'Debit', method: 'Wallet', date: '04 Dec 2025', status: 'Pending' },
    { id: 'TXN-91023', user: 'Usman Tariq', avatar: '/avatars/usman.jpg', amount: 'Rs. 2,500', type: 'Credit', method: 'Bank Transfer', date: '03 Dec 2025', status: 'Refunded' },
    { id: 'TXN-91024', user: 'Komal Shah', avatar: '/avatars/komal.jpg', amount: 'Rs. 350', type: 'Debit', method: 'Wallet', date: '03 Dec 2025', status: 'Failed' },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Success':
        return 'text-emerald-500 font-medium'
      case 'Pending':
        return 'bg-amber-100 text-amber-600 px-3 py-1 rounded text-sm'
      case 'Refunded':
        return 'bg-cyan-100 text-cyan-600 px-3 py-1 rounded text-sm'
      case 'Failed':
        return 'bg-red-100 text-red-500 px-3 py-1 rounded text-sm'
      default:
        return 'text-gray-500'
    }
  }

  const getTypeStyle = (type) => {
    return type === 'Credit'
      ? 'bg-emerald-500 text-white text-xs px-3 py-1 rounded'
      : 'bg-orange-400 text-white text-xs px-3 py-1 rounded'
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setPaymentMethod('')
    setTransactionType('')
    setStatus('')
  }

  const handleRetry = (transactionId) => {
    console.log('Retrying transaction:', transactionId)
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
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
                placeholder="Search by User / Transaction ID"
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
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Transaction<br/>ID</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">User</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Type</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Method</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Date</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className={index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 px-6 text-gray-800">{transaction.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 overflow-hidden">
                        <img
                          src={transaction.avatar}
                          alt={transaction.user}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentNode.innerText = getInitials(transaction.user)
                          }}
                        />
                      </div>
                      <span className="text-gray-800">{transaction.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">{transaction.amount}</td>
                  <td className="py-4 px-6">
                    <span className={getTypeStyle(transaction.type)}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{transaction.method}</td>
                  <td className="py-4 px-6 text-gray-500">{transaction.date}</td>
                  <td className="py-4 px-6">
                    <span className={getStatusStyle(transaction.status)}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {transaction.status === 'Failed' && (
                      <button
                        onClick={() => handleRetry(transaction.id)}
                        className="flex items-center gap-1.5 text-red-500 hover:text-red-600 font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry
                      </button>
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

export default TransactionsList
