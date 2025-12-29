import React, { useState, useRef, useEffect } from 'react'
import {
  Search,
  ChevronDown,
  Paperclip,
  Send,
  User,
  UserPlus,
  Download,
  FileImage,
  ArrowLeft
} from 'lucide-react'
import AssignAgentModal from '../../components/support/AssignAgentModal'
import ViewProfilePanel from '../../components/support/ViewProfilePanel'

// Mock data for chats
const initialChats = [
  {
    id: 'CHAT-88211',
    name: 'Ali Raza',
    oderId: 'USR-22119',
    userId: 'USR-22119',
    avatar: null,
    lastMessage: 'App is not loading my location...',
    time: '2 min ago',
    status: 'New',
    assignedTo: 'Unassigned',
    phone: '+92 3465545',
    email: 'aliraza@gmail.com',
    location: 'Karachi',
    joinDate: '12 Feb 2024',
    totalReports: 12,
    totalOrders: 15
  },
  {
    id: 'CHAT-88210',
    name: 'Sara Ahmed',
    oderId: 'USR-22118',
    userId: 'USR-22118',
    avatar: null,
    lastMessage: 'Payment failed but amount was deducted',
    time: '15 min ago',
    status: 'In Progress',
    assignedTo: 'Ahmed',
    phone: '+92 3456789',
    email: 'sara@gmail.com',
    location: 'Lahore',
    joinDate: '5 Jan 2024',
    totalReports: 8,
    totalOrders: 22
  },
  {
    id: 'CHAT-88209',
    name: 'Hassan Khan',
    oderId: 'USR-22117',
    userId: 'USR-22117',
    avatar: null,
    lastMessage: 'Cannot update my profile picture',
    time: '1 hour ago',
    status: 'Waiting',
    assignedTo: 'Faiza',
    phone: '+92 3123456',
    email: 'hassan@gmail.com',
    location: 'Islamabad',
    joinDate: '20 Mar 2024',
    totalReports: 5,
    totalOrders: 10
  },
  {
    id: 'CHAT-88208',
    name: 'Ayesha Malik',
    oderId: 'USR-22116',
    userId: 'USR-22116',
    avatar: null,
    lastMessage: 'Thank you for your help!',
    time: '3 hours ago',
    status: 'Resolved',
    assignedTo: 'Daniyal',
    phone: '+92 3001234',
    email: 'ayesha@gmail.com',
    location: 'Karachi',
    joinDate: '15 Dec 2023',
    totalReports: 3,
    totalOrders: 30
  },
  {
    id: 'CHAT-88207',
    name: 'Bilal Tariq',
    oderId: 'USR-22115',
    userId: 'USR-22115',
    avatar: null,
    lastMessage: 'How do I change my email address?',
    time: '5 hours ago',
    status: 'Resolved',
    assignedTo: 'Ahmad',
    phone: '+92 3009876',
    email: 'bilal@gmail.com',
    location: 'Multan',
    joinDate: '8 Apr 2024',
    totalReports: 2,
    totalOrders: 8
  }
]

// Mock messages for selected chat
const initialMessages = {
  'CHAT-88211': [
    {
      id: 1,
      sender: 'customer',
      text: 'Hello, my account is not loading properly.',
      time: '10:21 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'Hello Ali, please share a screenshot of the error.',
      time: '10:23 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'customer',
      text: 'Sure, here is the screenshot.',
      time: '10:28 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'customer',
      fileName: 'screenshot_error.png',
      fileSize: '245 KB',
      time: '10:28 AM',
      type: 'file'
    },
    {
      id: 5,
      sender: 'agent',
      text: 'Thank you. I can see the issue. Let me check with our technical team and get back to you shortly.',
      time: '10:30 AM',
      type: 'text'
    },
    {
      id: 6,
      sender: 'system',
      text: 'Status updated to "In Progress" by Admin',
      time: '10:30 AM',
      type: 'system'
    }
  ],
  'CHAT-88210': [
    {
      id: 1,
      sender: 'customer',
      text: 'Hi, I tried to make a payment but it failed. However, the amount was deducted from my account.',
      time: '9:45 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'I apologize for the inconvenience. Can you please share your transaction ID?',
      time: '9:50 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'customer',
      text: 'Transaction ID: TXN-89012345',
      time: '9:52 AM',
      type: 'text'
    }
  ],
  'CHAT-88209': [
    {
      id: 1,
      sender: 'customer',
      text: 'I am trying to update my profile picture but it keeps showing an error.',
      time: '8:30 AM',
      type: 'text'
    }
  ],
  'CHAT-88208': [
    {
      id: 1,
      sender: 'customer',
      text: 'Thank you for resolving my issue so quickly!',
      time: '6:00 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'You are welcome! Feel free to reach out if you need any help.',
      time: '6:05 AM',
      type: 'text'
    }
  ],
  'CHAT-88207': [
    {
      id: 1,
      sender: 'customer',
      text: 'How do I change my email address in the app?',
      time: '4:00 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'Go to Settings > Account > Email and you can update it there.',
      time: '4:15 AM',
      type: 'text'
    }
  ]
}

// Available agents
const agents = ['Ahmed', 'Faiza', 'Daniyal', 'Ahmad', 'Sara', 'Ali']

const SupportChats = () => {
  const [chats, setChats] = useState(initialChats)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedChat, setSelectedChat] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [assignedFilter, setAssignedFilter] = useState('Assigned To')
  const [newMessage, setNewMessage] = useState('')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [mobileView, setMobileView] = useState('list') // 'list', 'chat', 'profile'
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedChat])

  // Filter chats based on search and filters
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All Status' || chat.status === statusFilter
    const matchesAssigned = assignedFilter === 'Assigned To' ||
                            assignedFilter === 'All' ||
                            chat.assignedTo === assignedFilter ||
                            (assignedFilter === 'Unassigned' && chat.assignedTo === 'Unassigned')
    return matchesSearch && matchesStatus && matchesAssigned
  })

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-teal-100 text-teal-700'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700'
      case 'Waiting':
        return 'bg-orange-100 text-orange-700'
      case 'Resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Handle chat selection
  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setMobileView('chat')
  }

  // Handle back to list (mobile)
  const handleBackToList = () => {
    setMobileView('list')
    setShowProfile(false)
  }

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const newMsg = {
      id: Date.now(),
      sender: 'agent',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }))

    // Update last message in chat list
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: newMessage, time: 'Just now' }
        : chat
    ))

    setNewMessage('')
  }

  // Handle file attachment
  const handleFileAttachment = (e) => {
    const file = e.target.files[0]
    if (!file || !selectedChat) return

    const newMsg = {
      id: Date.now(),
      sender: 'agent',
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'file'
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }))

    // Update last message
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: `Sent: ${file.name}`, time: 'Just now' }
        : chat
    ))

    e.target.value = ''
  }

  // Assign agent to chat
  const handleAssignAgent = (agent, notes) => {
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, assignedTo: agent }
        : chat
    ))
    setSelectedChat(prev => ({ ...prev, assignedTo: agent }))

    // Add system message
    const systemMsg = {
      id: Date.now(),
      sender: 'system',
      text: `Chat assigned to ${agent}${notes ? ` - Note: ${notes}` : ''}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    }
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), systemMsg]
    }))
  }

  // Export chat
  const handleExport = () => {
    const chatMessages = messages[selectedChat.id] || []
    const exportData = {
      chatId: selectedChat.id,
      customer: selectedChat.name,
      status: selectedChat.status,
      assignedTo: selectedChat.assignedTo,
      messages: chatMessages.map(msg => ({
        sender: msg.sender,
        content: msg.text || msg.fileName,
        time: msg.time,
        type: msg.type
      }))
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-${selectedChat.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Toggle profile panel
  const toggleProfile = () => {
    if (window.innerWidth < 1024) {
      setMobileView(showProfile ? 'chat' : 'profile')
    }
    setShowProfile(!showProfile)
  }

  // Close profile on mobile
  const closeProfile = () => {
    setShowProfile(false)
    setMobileView('chat')
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
    

      <div className="flex-1 flex bg-white rounded-xl shadow-md overflow-hidden relative mt-8">
        {/* Left Sidebar - Chat List */}
        <div className={`
          ${mobileView === 'list' ? 'flex' : 'hidden'}
          sm:flex
          w-full sm:w-72 lg:w-80
          border-r border-gray-200 flex-col flex-shrink-0
          absolute sm:relative inset-0 z-20 bg-white
        `}>
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customer, chat ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-3 border-b border-gray-200 flex gap-2">
            <div className="relative flex-1">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none px-2 sm:px-3 py-2 pr-7 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option>All Status</option>
                <option>New</option>
                <option>In Progress</option>
                <option>Waiting</option>
                <option>Resolved</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
                className="w-full appearance-none px-2 sm:px-3 py-2 pr-7 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option>Assigned To</option>
                <option>All</option>
                <option>Unassigned</option>
                {agents.map(agent => (
                  <option key={agent}>{agent}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-teal-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium flex-shrink-0 text-sm">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-medium text-gray-900 text-sm">{chat.name}</span>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{chat.id}</p>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                        {chat.status}
                      </span>
                      <span className="text-xs text-gray-500">{chat.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Panel - Chat Conversation */}
        <div className={`
          ${mobileView === 'chat' || mobileView === 'profile' ? 'flex' : 'hidden'}
          sm:flex
          flex-1 flex-col min-w-0
          ${mobileView === 'profile' ? 'hidden lg:flex' : ''}
        `}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-2 sm:p-4 border-b border-gray-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {/* Back button - Mobile only */}
                  <button
                    onClick={handleBackToList}
                    className="sm:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    {selectedChat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{selectedChat.name}</span>
                      <span className="text-xs sm:text-sm text-gray-500 hidden xs:inline">({selectedChat.oderId})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedChat.status)}`}>
                      {selectedChat.status}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {/* Mobile: Icon only buttons */}
                  <button
                    onClick={toggleProfile}
                    className={`p-2 border rounded-lg transition-colors flex ${
                      showProfile
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    title="View Profile"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline ml-1 text-sm">View Profile</span>
                  </button>
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex"
                    title="Assign Agent"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden md:inline ml-1 text-sm">Assign Agent</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex"
                    title="Export"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden lg:inline ml-1 text-sm">Export</span>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
                <div className="space-y-3 sm:space-y-4">
                  {(messages[selectedChat.id] || []).map(message => (
                    <div key={message.id}>
                      {message.type === 'system' ? (
                        // System message
                        <div className="flex justify-center">
                          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600 text-center">
                            {message.text}
                          </span>
                        </div>
                      ) : message.sender === 'customer' ? (
                        // Customer message (left)
                        <div className="flex items-end gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                            {selectedChat.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="max-w-[75%] sm:max-w-md">
                            {message.type === 'file' ? (
                              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{message.fileName}</p>
                                    <p className="text-xs text-gray-500">{message.fileSize}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                                <p className="text-xs sm:text-sm text-gray-900">{message.text}</p>
                              </div>
                            )}
                            <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
                          </div>
                        </div>
                      ) : (
                        // Agent message (right)
                        <div className="flex items-end justify-end gap-2">
                          <div className="max-w-[75%] sm:max-w-md">
                            {message.type === 'file' ? (
                              <div className="bg-teal-600 rounded-lg p-2 sm:p-3 shadow-sm">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-white truncate">{message.fileName}</p>
                                    <p className="text-xs text-teal-200">{message.fileSize}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-teal-600 rounded-lg p-2 sm:p-3 shadow-sm">
                                <p className="text-xs sm:text-sm text-white">{message.text}</p>
                              </div>
                            )}
                            <span className="text-xs text-gray-500 mt-1 block text-right">{message.time}</span>
                          </div>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img
                              src="https://ui-avatars.com/api/?name=Admin&background=6b7280&color=fff&size=32"
                              alt="Agent"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-2 sm:p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileAttachment}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // No chat selected - Desktop only
            <div className="hidden sm:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - View Profile */}
        <ViewProfilePanel
          customer={selectedChat}
          isVisible={showProfile && selectedChat}
          onClose={closeProfile}
          isMobile={mobileView === 'profile'}
        />
      </div>

      {/* Assign Agent Modal */}
      <AssignAgentModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignAgent}
        currentAgent={selectedChat?.assignedTo}
      />
    </div>
  )
}

export default SupportChats
