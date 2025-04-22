import React, { useState } from 'react';
import { Clock, Play, Pause, Plus, Edit2, Trash2 } from 'lucide-react';
import { useGPS } from '../context/GPSContext';

interface Route {
  id: string;
  name: string;
  points: { lat: number; lng: number; speed?: number }[];
  duration: number; // in seconds
}

const RouteManager: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      name: 'City Loop',
      points: [
        { lat: 37.7749, lng: -122.4194 },
        { lat: 37.7848, lng: -122.4294 },
        { lat: 37.7947, lng: -122.4194 }
      ],
      duration: 300
    }
  ]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const { updatePosition } = useGPS();

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    const route = routes.find(r => r.id === routeId);
    if (route && route.points.length > 0) {
      updatePosition(route.points[0]);
    }
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Route Manager
          </h2>
          <button
            className="px-4 py-2 bg-[#3498db] text-white rounded-lg flex items-center gap-2 hover:bg-[#2980b9]"
          >
            <Plus className="h-5 w-5" />
            New Route
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#252525] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Saved Routes</h3>
            <div className="space-y-3">
              {routes.map(route => (
                <div
                  key={route.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    selectedRoute === route.id
                      ? 'border-[#3498db] bg-[#2c3e50]'
                      : 'border-gray-700 bg-[#1e1e1e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleRouteSelect(route.id)}
                      className="text-gray-200 hover:text-[#3498db]"
                    >
                      {route.name}
                    </button>
                    <span className="text-sm text-gray-400">
                      {route.points.length} points • {Math.floor(route.duration / 60)}m {route.duration % 60}s
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#3498db] rounded-lg hover:bg-[#2c3e50]">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-[#2c3e50]">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedRoute && (
            <div className="bg-[#252525] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-200">Simulation Control</h3>
                <button
                  onClick={toggleSimulation}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isSimulating
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isSimulating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  {isSimulating ? 'Stop' : 'Start'} Simulation
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-[#1e1e1e] p-3 rounded-lg">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-0 bg-[#3498db] rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1e1e1e] p-3 rounded-lg">
                    <span className="text-sm text-gray-400">Current Speed</span>
                    <p className="text-xl text-gray-200">0 km/h</p>
                  </div>
                  <div className="bg-[#1e1e1e] p-3 rounded-lg">
                    <span className="text-sm text-gray-400">Time Remaining</span>
                    <p className="text-xl text-gray-200">0:00</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteManager;