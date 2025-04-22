import React from 'react';
import { ChevronLeft, ChevronRight, Save, List, MapPin, FileText, Clock } from 'lucide-react';
import SavedLocations from './SavedLocations';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [activeTab, setActiveTab] = React.useState('locations');

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>GPS Spoofer</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="sidebar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'locations' ? 'active' : ''}`}
          onClick={() => setActiveTab('locations')}
        >
          <MapPin size={18} />
          <span>Locations</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
          onClick={() => setActiveTab('routes')}
        >
          <Clock size={18} />
          <span>Routes</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <FileText size={18} />
          <span>Logs</span>
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === 'locations' && <SavedLocations />}
        {activeTab === 'routes' && <div className="tab-content">Routes content</div>}
        {activeTab === 'logs' && (
          <div className="tab-content logs">
            <div className="log-entry">[INFO] System started at 09:32:15</div>
            <div className="log-entry">[INFO] GPS receiver connected</div>
            <div className="log-entry">[INFO] HackRF One detected</div>
            <div className="log-entry">[WARNING] No external antenna detected</div>
            <div className="log-entry">[INFO] Web interface started</div>
            <div className="log-entry">[INFO] Current position: 37.7749° N, 122.4194° W</div>
            <div className="log-entry">[INFO] Signal strength: Good</div>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <button className="action-btn">
          <Save size={18} />
          <span>Save Current</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;