import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Position {
  lat: number;
  lng: number;
}

interface GPSContextType {
  currentPosition: Position | null;
  spoofedPosition: Position | null;
  isTransmitting: boolean;
  setSpoofedPosition: (position: Position) => void;
  setIsTransmitting: (isTransmitting: boolean) => void;
  updatePosition: (position: Position) => void;
}

const GPSContext = createContext<GPSContextType | null>(null);

export const useGPS = () => {
  const context = useContext(GPSContext);
  if (!context) {
    throw new Error('useGPS must be used within a GPSProvider');
  }
  return context;
};

export const GPSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>({
    lat: 37.7749,
    lng: -122.4194
  });
  const [spoofedPosition, setSpoofedPosition] = useState<Position | null>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const updatePosition = useCallback((position: Position) => {
    setSpoofedPosition(position);
    // In a real implementation, this would send the update to the HackRF
    if (isTransmitting) {
      console.log('Updating transmitted position:', position);
    }
  }, [isTransmitting]);

  // Simulate receiving actual GPS data
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentPosition && !isTransmitting) {
        setCurrentPosition({
          lat: currentPosition.lat + (Math.random() - 0.5) * 0.0002,
          lng: currentPosition.lng + (Math.random() - 0.5) * 0.0002
        });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentPosition, isTransmitting]);

  // Handle transmission state changes
  useEffect(() => {
    if (isTransmitting && spoofedPosition) {
      console.log('Starting transmission at position:', spoofedPosition);
      // In a real implementation, this would start the HackRF transmission
    } else if (!isTransmitting) {
      console.log('Stopping transmission');
      // In a real implementation, this would stop the HackRF transmission
    }
  }, [isTransmitting, spoofedPosition]);

  const value = {
    currentPosition,
    spoofedPosition,
    isTransmitting,
    setSpoofedPosition: updatePosition,
    setIsTransmitting,
    updatePosition
  };

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>;
};