import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static files from the React app build directory
app.use(express.static(join(__dirname, '../dist')));

// Mock hardware interface - in a real implementation, these would interact with actual hardware
const hardware = {
  gps: {
    connected: true,
    currentPosition: {
      lat: 37.7749,
      lng: -122.4194,
      alt: 0,
      speed: 0
    }
  },
  hackrf: {
    connected: true,
    transmitting: false,
    frequency: 1575.42, // GPS L1 frequency in MHz
    signalStrength: 0.8
  },
  rtc: {
    connected: true,
    time: new Date()
  }
};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send initial hardware status
  socket.emit('hardware-status', hardware);
  
  // Handle GPS spoofing requests
  socket.on('spoof-gps', (data) => {
    console.log('Spoofing GPS position:', data);
    // In a real implementation, this would send commands to the HackRF
    hardware.hackrf.transmitting = data.transmitting;
    
    // Acknowledge the request
    socket.emit('spoof-status', {
      success: true,
      message: data.transmitting ? 'Spoofing started' : 'Spoofing stopped'
    });
  });
  
  // Handle hardware control requests
  socket.on('hardware-control', (data) => {
    console.log('Hardware control:', data);
    // In a real implementation, this would send commands to the respective hardware
    
    if (data.device === 'hackrf') {
      hardware.hackrf.frequency = data.frequency || hardware.hackrf.frequency;
      hardware.hackrf.signalStrength = data.signalStrength || hardware.hackrf.signalStrength;
    }
    
    // Acknowledge the request
    socket.emit('hardware-control-status', {
      success: true,
      device: data.device,
      message: `${data.device} settings updated`
    });
  });
  
  // Handle saved location requests
  socket.on('save-location', (data) => {
    console.log('Saving location:', data);
    // In a real implementation, this would save to a file or database
    
    // Acknowledge the request
    socket.emit('save-location-status', {
      success: true,
      message: 'Location saved'
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hardware
  });
});

// API endpoint for hardware status
app.get('/api/hardware', (req, res) => {
  res.json(hardware);
});

// Fallback route - serve the React app for all other requests
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Simulate GPS updates
setInterval(() => {
  // Add small random fluctuations to the GPS position
  hardware.gps.currentPosition.lat += (Math.random() - 0.5) * 0.0002;
  hardware.gps.currentPosition.lng += (Math.random() - 0.5) * 0.0002;
  
  // Update RTC time
  hardware.rtc.time = new Date();
  
  // Broadcast updates to all connected clients
  io.emit('hardware-update', hardware);
}, 3000);