#!/bin/bash

# Start script for the GPS Spoofing system

# Change to the project directory
cd /home/project

# Start the server
echo "Starting GPS Spoofing server..."
if command -v pm2 &> /dev/null; then
    # Use PM2 if available
    pm2 start server/index.js --name gps-spoofer
else
    # Otherwise use node directly
    node server/index.js &
fi

# If this script is running on the Raspberry Pi with a display,
# start the browser in kiosk mode
if [[ -n $DISPLAY ]]; then
    echo "Starting browser in kiosk mode..."
    # Wait for server to start
    sleep 5
    
    # Use Chromium browser if available
    if command -v chromium-browser &> /dev/null; then
        chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:3000 &
    elif command -v chromium &> /dev/null; then
        chromium --noerrdialogs --disable-infobars --kiosk http://localhost:3000 &
    elif command -v firefox &> /dev/null; then
        firefox --kiosk http://localhost:3000 &
    fi
    
    # Disable screen blanking and screensaver
    if command -v xset &> /dev/null; then
        xset s off
        xset -dpms
        xset s noblank
    fi
fi

echo "GPS Spoofing system started successfully"
echo "Web interface available at http://localhost:3000"