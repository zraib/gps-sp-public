import React from 'react';

const SystemConfig = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Configuration</h2>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter system name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Interval (ms)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hardware Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Serial Port
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select port</option>
                <option value="/dev/ttyUSB0">/dev/ttyUSB0</option>
                <option value="/dev/ttyUSB1">/dev/ttyUSB1</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Baud Rate
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="9600">9600</option>
                <option value="19200">19200</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="115200">115200</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="debug-mode"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="debug-mode" className="ml-2 block text-sm text-gray-700">
                Enable Debug Mode
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="auto-reconnect"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="auto-reconnect" className="ml-2 block text-sm text-gray-700">
                Auto Reconnect
              </label>
            </div>
          </div>
        </section>

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Reset
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;