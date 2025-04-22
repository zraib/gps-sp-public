#!/bin/bash

# Script to set up the GPS spoofing environment on Raspberry Pi
# This should be run once when setting up the device

echo "Setting up GPS Spoofing environment..."

# Update system packages
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install required dependencies
echo "Installing dependencies..."
apt-get install -y git build-essential cmake libusb-1.0-0-dev \
    python3-pip nodejs npm i2c-tools gpsd gpsd-clients \
    chromium-browser unclutter xdotool

# Install HackRF tools
echo "Installing HackRF tools..."
if ! command -v hackrf_info &> /dev/null; then
    git clone https://github.com/greatscottgadgets/hackrf.git
    cd hackrf/host
    mkdir build
    cd build
    cmake ..
    make
    make install
    ldconfig
    cd ../../../
    rm -rf hackrf
fi

# Set up the web server to start on boot
echo "Setting up autostart..."
mkdir -p /home/pi/.config/autostart

# Create autostart file for Chromium
cat > /home/pi/.config/autostart/gps-spoofer.desktop << EOL
[Desktop Entry]
Type=Application
Name=GPS Spoofer
Exec=/bin/bash /home/pi/gps-spoofer/scripts/start.sh
X-GNOME-Autostart-enabled=true
EOL

# Create the start script
cat > /scripts/start.sh << EOL
#!/bin/bash

# Wait for network and system to fully initialize
sleep 30

# Start the server
cd /home/pi/gps-spoofer
npm run start &

# Wait for server to start
sleep 10

# Start Chromium in kiosk mode
chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:3000 &

# Disable screen blanking and screensaver
xset s off
xset -dpms
xset s noblank
EOL

chmod +x /scripts/start.sh

# Set up the Node.js application
echo "Setting up Node.js application..."
npm install -g pm2
pm2 startup
pm2 save

echo "Setup complete! Please reboot the Raspberry Pi to activate the GPS spoofer."
echo "The web interface will automatically start in kiosk mode on the 7\" touchscreen."
echo "You can also access the interface via a web browser at the Raspberry Pi's IP address on port 3000."