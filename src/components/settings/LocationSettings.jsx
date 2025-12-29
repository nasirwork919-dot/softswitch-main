import React, { useState } from 'react';

const LocationSettings = () => {
  const [googleMapsKey, setGoogleMapsKey] = useState('');
  const [mapboxKey, setMapboxKey] = useState('');
  const [mapProvider, setMapProvider] = useState('Google Maps');
  const [locationAccuracy, setLocationAccuracy] = useState('High Accuracy');

  const handleSave = () => {
    console.log('Settings saved:', {
      googleMapsKey,
      mapboxKey,
      mapProvider,
      locationAccuracy
    });
    alert('API Settings saved successfully!');
  };

  return (
    <div className="w-full  pt-4 ">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Map / Location Settings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Google Maps Key */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Google Maps Key
            </label>
            <input
              type="text"
              value={googleMapsKey}
              onChange={(e) => setGoogleMapsKey(e.target.value)}
              placeholder="Enter Google Maps API Key"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Map Provider */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Map Provider
            </label>
            <select
              value={mapProvider}
              onChange={(e) => setMapProvider(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center'
              }}
            >
              <option>Google Maps</option>
              <option>Mapbox</option>
              <option>OpenStreetMap</option>
            </select>
          </div>

          {/* Mapbox Key */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Mapbox Key
            </label>
            <input
              type="text"
              value={mapboxKey}
              onChange={(e) => setMapboxKey(e.target.value)}
              placeholder="Enter Mapbox API Key"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Location Accuracy */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Location Accuracy
            </label>
            <select
              value={locationAccuracy}
              onChange={(e) => setLocationAccuracy(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center'
              }}
            >
              <option>High Accuracy</option>
              <option>Medium Accuracy</option>
              <option>Low Accuracy</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
          >
            Save API Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;