import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';
import StatusBar from './components/StatusBar';
import SignalControl from './components/SignalControl';
import RouteManager from './components/RouteManager';
import SystemConfig from './components/SystemConfig';
import { MapPin, Zap, Clock, Wifi, Radio, Settings } from 'lucide-react';
import { GPSProvider } from './context/GPSContext';
import { HardwareProvider } from './context/HardwareContext';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('map');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'map':
        return (
          <>
            <MapView />
            <ControlPanel />
          </>
        );
      case 'spoof':
        return <SignalControl />;
      case 'routes':
        return <RouteManager />;
      case 'signal':
        return <SignalControl />;
      case 'status':
        return <StatusBar expanded />;
      case 'config':
        return <SystemConfig />;
      default:
        return (
          <>
            <MapView />
            <ControlPanel />
          </>
        );
    }
  };

  return (
    <GPSProvider>
      <HardwareProvider>
        <div className="app-container">
          <StatusBar />
          
          <div className="main-content">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div className={`content-area ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              {renderActiveView()}
            </div>
          </div>
          
          <nav className="bottom-nav">
            <button 
              className={`nav-button ${activeView === 'map' ? 'active' : ''}`}
              onClick={() => setActiveView('map')}
            >
              <MapPin size={24} />
              <span>Map</span>
            </button>
            <button 
              className={`nav-button ${activeView === 'spoof' ? 'active' : ''}`}
              onClick={() => setActiveView('spoof')}
            >
              <Zap size={24} />
              <span>Spoof</span>
            </button>
            <button 
              className={`nav-button ${activeView === 'routes' ? 'active' : ''}`}
              onClick={() => setActiveView('routes')}
            >
              <Clock size={24} />
              <span>Routes</span>
            </button>
            <button 
              className={`nav-button ${activeView === 'signal' ? 'active' : ''}`}
              onClick={() => setActiveView('signal')}
            >
              <Radio size={24} />
              <span>Signal</span>
            </button>
            <button 
              className={`nav-button ${activeView === 'status' ? 'active' : ''}`}
              onClick={() => setActiveView('status')}
            >
              <Wifi size={24} />
              <span>Status</span>
            </button>
            <button 
              className={`nav-button ${activeView === 'config' ? 'active' : ''}`}
              onClick={() => setActiveView('config')}
            >
              <Settings size={24} />
              <span>Config</span>
            </button>
          </nav>
        </div>
      </HardwareProvider>
    </GPSProvider>
  );
}

export default App;