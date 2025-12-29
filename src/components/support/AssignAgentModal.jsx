import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

const agents = [
  { id: 1, name: 'Ahmed Khan', avatar: null },
  { id: 2, name: 'Faiza Ali', avatar: null },
  { id: 3, name: 'Daniyal Hassan', avatar: null },
  { id: 4, name: 'Ahmad Raza', avatar: null },
  { id: 5, name: 'Sara Malik', avatar: null },
  { id: 6, name: 'Ali Hassan', avatar: null }
]

const AssignAgentModal = ({ isOpen, onClose, onAssign, currentAgent }) => {
  const [selectedAgent, setSelectedAgent] = useState('')
  const [notes, setNotes] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (!isOpen) return null

  const handleAssign = () => {
    if (!selectedAgent) return
    onAssign(selectedAgent, notes)
    setSelectedAgent('')
    setNotes('')
    onClose()
  }

  const handleCancel = () => {
    setSelectedAgent('')
    setNotes('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[calc(100vw-24px)] sm:max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
            Assign Chat to Support Agent
          </h3>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Agent Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Assign Chat
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <span className={`truncate ${selectedAgent ? 'text-gray-900' : 'text-gray-500'}`}>
                {selectedAgent || 'Select Agent'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 max-h-40 sm:max-h-48 overflow-y-auto">
                {agents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent.name)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 sm:gap-3 ${
                      selectedAgent === agent.name ? 'bg-teal-50 text-teal-700' : 'text-gray-900'
                    }`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="truncate">{agent.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for this agent..."
            rows={3}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 sm:px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedAgent}
            className="flex-1 px-4 sm:px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
          >
            Assign Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssignAgentModal
