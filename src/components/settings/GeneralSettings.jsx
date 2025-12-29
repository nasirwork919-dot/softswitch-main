import React, { useState } from 'react';
import { Image } from 'lucide-react';

const GeneralSettings = () => {
  const [appName, setAppName] = useState('Community Connect');
  const [supportEmail, setSupportEmail] = useState('support@communityapp.com');
  const [contactNumber, setContactNumber] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size must be less than 2MB');
    }
  };

  const handleSaveChanges = () => {
    console.log({
      appName,
      supportEmail,
      contactNumber,
      logo: logoPreview
    });
    alert('Changes saved successfully!');
  };

  return (
    <div className=" pt-3 ">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
          
          {/* Header */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            General Settings
          </h1>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              
              {/* App Name */}
              <div>
                <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-2">
                  App Name
                </label>
                <input
                  type="text"
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Community Connect"
                />
              </div>

              {/* App Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Logo
                </label>
                <div className="flex items-start gap-4">
                  {/* Logo Preview */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <label
                      htmlFor="logoUpload"
                      className="inline-block px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors"
                    >
                      Upload Logo
                    </label>
                    <input
                      type="file"
                      id="logoUpload"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      PNG/JPG, Max 2MB
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Support Email */}
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="support@communityapp.com"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number (Optional)
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Enter support phone number"
                />
              </div>

            </div>

          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;