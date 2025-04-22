import React, { useState } from 'react';
import { Radio, Power, RefreshCw, AlertTriangle } from 'lucide-react';

const SignalControl: React.FC = () => {
  const [signalStrength, setSignalStrength] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [frequency, setFrequency] = useState('1575.42'); // Default GPS L1 frequency in MHz

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Radio className="h-6 w-6" />
            Signal Control
          </h2>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Power className="h-5 w-5" />
            {isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Signal Strength</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={signalStrength}
              onChange={(e) => setSignalStrength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">0%</span>
              <span className="text-sm text-gray-600">{signalStrength}%</span>
              <span className="text-sm text-gray-600">100%</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Frequency (MHz)</h3>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter frequency in MHz"
              />
              <button
                onClick={() => setFrequency('1575.42')}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                title="Reset to GPS L1 frequency"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          {isActive && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <p className="ml-3 text-sm text-yellow-700">
                  Signal spoofing is active. Use with caution and only in authorized testing environments.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignalControl;