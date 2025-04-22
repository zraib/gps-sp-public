# GPS Spoofing Device

A comprehensive GPS spoofing system built on a Raspberry Pi with HackRF One, u-blox NEO M8N GPS receiver, and RTC module. This system features a web-based interface for controlling and monitoring the GPS spoofing operations.

## Hardware Requirements

- Raspberry Pi (3 or 4 recommended)
- 7" Touchscreen display
- HackRF One (for GPS signal generation)
- u-blox NEO M8N GPS receiver (for receiving real GPS signals)
- RTC module (for maintaining accurate time)
- Power supply

## Features

- Real-time GPS spoofing with custom coordinate input
- Saved location profiles for quick position spoofing
- Live map visualization of both real and spoofed positions
- Hardware status monitoring
- Trajectory simulation for creating movement patterns
- System configuration and calibration tools
- Secure remote access via ethernet connection

## Installation

1. Clone this repository to your Raspberry Pi:

```bash
git clone https://github.com/username/gps-spoofer.git
cd gps-spoofer
```

2. Run the setup script:

```bash
sudo ./scripts/setup.sh
```

3. Reboot the Raspberry Pi:

```bash
sudo reboot
```

## Usage

The web interface will automatically start on boot and display on the 7" touchscreen. You can also access the interface by navigating to `http://<raspberry-pi-ip>:3000` from any device on the same network.

### Interface Overview

- **Map View**: Shows your current real position and spoofed position on a map
- **Control Panel**: Input coordinates, altitude, and speed for GPS spoofing
- **Saved Locations**: Quick access to saved locations for spoofing
- **Routes**: Create and manage trajectory patterns
- **System Status**: Monitor hardware connections and performance

### Spoofing GPS Location

1. Enter the desired latitude and longitude in the Control Panel
2. Optionally set altitude and speed
3. Click "Update Location" to set the coordinates
4. Click "Start Transmission" to begin broadcasting the spoofed signal

## Security Warning

This tool is designed for educational and research purposes only. Using this device to spoof GPS signals in real-world situations may be illegal in many jurisdictions. Always ensure you are complying with local laws and regulations.

## License

This project is licensed under the MIT License - see the LICENSE file for details.