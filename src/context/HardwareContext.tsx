import React, { createContext, useContext, useState, useEffect } from 'react';

interface HardwareStatus {
  gps: boolean;
  hackrf: boolean;
  rtc: boolean;
}

interface HardwareContextType {
  hardwareStatus: HardwareStatus;
  connectHardware: (device: keyof HardwareStatus) => void;
  disconnectHardware: (device: keyof HardwareStatus) => void;
}

const HardwareContext = createContext<HardwareContextType | null>(null);

export const useHardware = () => {
  const context = useContext(HardwareContext);
  if (!context) {
    throw new Error('useHardware must be used within a HardwareProvider');
  }
  return context;
};

export const HardwareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hardwareStatus, setHardwareStatus] = useState<HardwareStatus>({
    gps: true,
    hackrf: true,
    rtc: true
  });

  const connectHardware = (device: keyof HardwareStatus) => {
    setHardwareStatus(prev => ({
      ...prev,
      [device]: true
    }));
  };

  const disconnectHardware = (device: keyof HardwareStatus) => {
    setHardwareStatus(prev => ({
      ...prev,
      [device]: false
    }));
  };

  // Simulate occasional hardware connection issues
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Randomly simulate a device disconnecting
      const devices: (keyof HardwareStatus)[] = ['gps', 'hackrf', 'rtc'];
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      
      if (Math.random() > 0.8) {
        disconnectHardware(randomDevice);
        
        // Reconnect after a few seconds
        setTimeout(() => {
          connectHardware(randomDevice);
        }, 5000);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const value = {
    hardwareStatus,
    connectHardware,
    disconnectHardware
  };

  return <HardwareContext.Provider value={value}>{children}</HardwareContext.Provider>;
};