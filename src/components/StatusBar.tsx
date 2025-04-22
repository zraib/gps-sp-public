import React from 'react';
import { useHardware } from '../context/HardwareContext';
import { Wifi, Signal, Battery, Clock, AlertTriangle } from 'lucide-react';
import './StatusBar.css';

const StatusBar: React.FC = () => {
  const { hardwareStatus } = useHardware();
  
  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <span className="time">{new Date().toLocaleTimeString()}</span>
      </div>
      
      <div className="status-bar-right">
        <div className={`status-item ${hardwareStatus.gps ? 'connected' : 'disconnected'}`}>
          <Signal size={16} />
          <span className="status-label">GPS</span>
        </div>
        
        <div className={`status-item ${hardwareStatus.hackrf ? 'connected' : 'disconnected'}`}>
          <Wifi size={16} />
          <span className="status-label">HackRF</span>
        </div>
        
        <div className={`status-item ${hardwareStatus.rtc ? 'connected' : 'disconnected'}`}>
          <Clock size={16} />
          <span className="status-label">RTC</span>
        </div>
        
        <div className="status-item battery">
          <Battery size={16} />
          <span className="status-label">85%</span>
        </div>
        
        <div className="status-notifications">
          {!hardwareStatus.gps && (
            <div className="notification">
              <AlertTriangle size={14} color="#f39c12" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;