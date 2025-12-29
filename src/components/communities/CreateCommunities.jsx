import React, { useState } from 'react'
import { MapPin, Pencil, Trash2, Plus, Minus, Navigation, HelpCircle } from 'lucide-react'
import frames from '../../assets/frames.png'
const CreateCommunities = () => {
  const [formData, setFormData] = useState({
    communityName: '',
    city: '',
    latitude: '',
    longitude: '',
    description: ''
  })

  const [isDrawing, setIsDrawing] = useState(false)
  const [boundaryArea, setBoundaryArea] = useState(0)

  const cities = [
    { value: '', label: 'Select city' },
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'phoenix', label: 'Phoenix' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDraw = () => {
    setIsDrawing(true)
    setBoundaryArea(0)
  }

  const handleClear = () => {
    setIsDrawing(false)
    setBoundaryArea(0)
  }

  return (
    <div className="p-6">
      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 mb-5">
        {/* Community Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Community Name
          </label>
          <input
            type="text"
            name="communityName"
            value={formData.communityName}
            onChange={handleInputChange}
            placeholder="Community Name"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-colors"
          />
        </div>

        {/* City / Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City / Area
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-colors cursor-pointer"
            >
              {cities.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Location Coordinates */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Coordinates
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="Latitude"
                className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-colors"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="Longitude"
                className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-colors"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] text-gray-500 font-medium">i</span>
            Automatically set via map interaction
          </p>
        </div>
      </div>

      {/* Set Boundaries on Map Link */}
      <div className="mb-4 bg-blue-50 rounded-lg p-4 flex flex-col">
        <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
          <img src={frames} alt="" className='h-4 w-4'/>
          <span className="text-sm font-medium text-[#1E3A8A]">Set Boundaries on Map</span>
        </button>
        <p className="text-xs text-[#1D4ED8] ml-6 mt-0.5">
          Draw or adjust the boundary to define the community area on the map to the right
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Map Section */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl overflow-hidden shadow-lg">
        {/* Map Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Community Boundary Map</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDraw}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-md transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Draw
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-80 bg-gradient-to-b from-blue-50 to-blue-100">
          {/* World Map SVG Background */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Ocean Background */}
            <rect width="1000" height="500" fill="#e8f4f8" />

            {/* Simplified World Continents with 3D effect */}
            <defs>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* North America */}
            <path
              d="M 150 80 Q 200 60 250 80 Q 280 100 290 140 Q 300 180 280 220 Q 260 250 220 260 Q 180 270 150 250 Q 120 230 110 190 Q 100 150 120 110 Q 130 90 150 80 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />

            {/* South America */}
            <path
              d="M 220 280 Q 250 270 270 290 Q 290 330 280 380 Q 270 430 240 450 Q 210 460 190 440 Q 170 410 180 360 Q 190 310 220 280 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />

            {/* Europe */}
            <path
              d="M 450 80 Q 480 70 520 80 Q 550 100 540 130 Q 530 150 500 160 Q 470 170 440 150 Q 420 130 430 100 Q 440 85 450 80 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />

            {/* Africa */}
            <path
              d="M 470 180 Q 510 170 550 190 Q 580 220 580 280 Q 580 340 550 380 Q 520 420 480 420 Q 440 420 420 380 Q 400 340 410 280 Q 420 220 450 190 Q 460 180 470 180 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />

            {/* Asia */}
            <path
              d="M 560 60 Q 620 50 700 70 Q 780 90 840 130 Q 880 160 880 200 Q 880 240 840 270 Q 800 300 740 300 Q 680 300 620 270 Q 560 240 540 190 Q 530 150 540 110 Q 550 70 560 60 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />

            {/* Australia */}
            <path
              d="M 780 340 Q 820 330 860 350 Q 890 380 880 420 Q 870 450 830 460 Q 790 470 760 450 Q 730 420 740 380 Q 750 350 780 340 Z"
              fill="url(#landGradient)"
              filter="url(#shadow)"
            />
          </svg>

          {/* Interactive Map Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Interactive Map</h3>
              <p className="text-xs text-gray-500">
                Draw boundaries to define<br />community area
              </p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Navigation className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Boundary Area Badge */}
          <div className="absolute left-3 bottom-3">
            <div className="bg-teal-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Boundary Area: {boundaryArea} km²
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Need help creating your community?</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Follow these steps to successfully set up your community boundaries and information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">1</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Fill basic info</h4>
              <p className="text-xs text-gray-500 mt-0.5">Enter name and city</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">2</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Draw boundaries</h4>
              <p className="text-xs text-gray-500 mt-0.5">Use polygon tool on map</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">3</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Review and create</h4>
              <p className="text-xs text-gray-500 mt-0.5">Confirm all details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCommunities
