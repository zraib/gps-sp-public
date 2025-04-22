import { exec } from 'child_process';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths to store hardware configuration and logs
const CONFIG_PATH = join(__dirname, '../data/config.json');
const LOGS_PATH = join(__dirname, '../data/logs.json');

// Ensure data directory exists
if (!fs.existsSync(dirname(CONFIG_PATH))) {
  fs.mkdirSync(dirname(CONFIG_PATH), { recursive: true });
}

// Default configuration
const defaultConfig = {
  gps: {
    device: '/dev/ttyACM0',
    baudRate: 9600
  },
  hackrf: {
    device: '0',
    sampleRate: 2000000,
    frequency: 1575420000, // GPS L1 frequency in Hz
    gain: 40
  },
  rtc: {
    device: '/dev/i2c-1',
    address: '0x68'
  }
};

// Initialize or load configuration
let config = defaultConfig;
try {
  if (fs.existsSync(CONFIG_PATH)) {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } else {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
  }
} catch (error) {
  console.error('Error loading configuration:', error);
}

// Hardware interface class for GPS receiver
class GPSReceiver {
  constructor(config) {
    this.config = config;
    this.connected = false;
    this.position = { lat: 0, lng: 0, alt: 0, speed: 0 };
  }

  connect() {
    console.log(`[GPS] Connecting to ${this.config.device}...`);
    // In a real implementation, this would use a library like node-serialport
    // to connect to the GPS receiver
    
    // Simulate successful connection
    this.connected = true;
    this.logEvent('connected', 'GPS receiver connected');
    return this.connected;
  }

  disconnect() {
    console.log('[GPS] Disconnecting...');
    this.connected = false;
    this.logEvent('disconnected', 'GPS receiver disconnected');
    return true;
  }

  getPosition() {
    if (!this.connected) {
      return null;
    }
    
    // In a real implementation, this would parse NMEA sentences from the GPS receiver
    // Simulate getting position data with small random fluctuations
    this.position.lat += (Math.random() - 0.5) * 0.0002;
    this.position.lng += (Math.random() - 0.5) * 0.0002;
    
    return this.position;
  }

  logEvent(type, message) {
    const log = {
      device: 'gps',
      type,
      message,
      timestamp: new Date().toISOString()
    };
    
    appendLog(log);
  }
}

// Hardware interface class for HackRF One
class HackRF {
  constructor(config) {
    this.config = config;
    this.connected = false;
    this.transmitting = false;
  }

  connect() {
    console.log('[HackRF] Connecting...');
    
    // In a real implementation, this would use hackrf_info to check if the device is connected
    exec('hackrf_info', (error, stdout, stderr) => {
      if (error) {
        console.error(`[HackRF] Error: ${error.message}`);
        this.connected = false;
        return;
      }
      
      this.connected = true;
      this.logEvent('connected', 'HackRF One connected');
    });
    
    // Simulate successful connection for demo
    this.connected = true;
    return this.connected;
  }

  disconnect() {
    if (this.transmitting) {
      this.stopTransmission();
    }
    
    console.log('[HackRF] Disconnecting...');
    this.connected = false;
    this.logEvent('disconnected', 'HackRF One disconnected');
    return true;
  }

  startTransmission(lat, lng, alt, speed) {
    if (!this.connected) {
      return false;
    }
    
    console.log(`[HackRF] Starting transmission for position: ${lat}, ${lng}, ${alt}m, ${speed}km/h`);
    
    // In a real implementation, this would call hackrf_transfer with a GPS signal file
    // generated based on the provided coordinates
    
    // Example command (not actually executed in this mock):
    // exec(`hackrf_transfer -t gps_signal.bin -f ${this.config.frequency} -s ${this.config.sampleRate} -a 1 -x ${this.config.gain}`)
    
    this.transmitting = true;
    this.logEvent('transmission_started', `Spoofing position: ${lat}, ${lng}`);
    return true;
  }

  stopTransmission() {
    if (!this.connected || !this.transmitting) {
      return false;
    }
    
    console.log('[HackRF] Stopping transmission');
    
    // In a real implementation, this would kill the hackrf_transfer process
    
    this.transmitting = false;
    this.logEvent('transmission_stopped', 'GPS spoofing stopped');
    return true;
  }

  logEvent(type, message) {
    const log = {
      device: 'hackrf',
      type,
      message,
      timestamp: new Date().toISOString()
    };
    
    appendLog(log);
  }
}

// Hardware interface class for RTC module
class RTCModule {
  constructor(config) {
    this.config = config;
    this.connected = false;
  }

  connect() {
    console.log(`[RTC] Connecting to ${this.config.device}...`);
    
    // In a real implementation, this would use i2c-bus to connect to the RTC
    
    // Simulate successful connection
    this.connected = true;
    this.logEvent('connected', 'RTC module connected');
    return this.connected;
  }

  disconnect() {
    console.log('[RTC] Disconnecting...');
    this.connected = false;
    this.logEvent('disconnected', 'RTC module disconnected');
    return true;
  }

  getTime() {
    if (!this.connected) {
      return null;
    }
    
    // In a real implementation, this would read the time from the RTC module
    return new Date();
  }

  setTime(date) {
    if (!this.connected) {
      return false;
    }
    
    console.log(`[RTC] Setting time to ${date.toISOString()}`);
    
    // In a real implementation, this would set the RTC time
    
    this.logEvent('time_set', `Time set to ${date.toISOString()}`);
    return true;
  }

  logEvent(type, message) {
    const log = {
      device: 'rtc',
      type,
      message,
      timestamp: new Date().toISOString()
    };
    
    appendLog(log);
  }
}

// Helper function to append logs
function appendLog(log) {
  try {
    let logs = [];
    
    if (fs.existsSync(LOGS_PATH)) {
      logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf8'));
    }
    
    logs.push(log);
    
    // Keep only the last 1000 logs
    if (logs.length > 1000) {
      logs = logs.slice(logs.length - 1000);
    }
    
    fs.writeFileSync(LOGS_PATH, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error appending log:', error);
  }
}

// Create instances of the hardware interfaces
const gpsReceiver = new GPSReceiver(config.gps);
const hackrf = new HackRF(config.hackrf);
const rtcModule = new RTCModule(config.rtc);

// Export the hardware interfaces
export { gpsReceiver, hackrf, rtcModule, config };