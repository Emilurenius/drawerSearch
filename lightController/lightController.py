import time, json, os, random, datetime, argparse, requests
from rpi_ws281x import *

# LED strip configuration:
GRID_WIDTH     = 3
GRID_HEIGHT    = 3
LED_COUNT      = GRID_WIDTH * GRID_HEIGHT # Number of LED pixels.
LED_PIN        = 18                       # GPIO pin connected to the pixels (18 uses PWM!). (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000                   # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10                       # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255                      # Set to 0 for darkest and 255 for brightest

# True to invert the signal (when using NPN transistor level shift)
LED_INVERT     = False
LED_CHANNEL    = 0                        # set to '1' for GPIOs 13, 19, 41, 45 or 53

serverAddress = "http://localhost:3000"
pixelGrid = []

temp = 0
while temp < GRID_HEIGHT:
    temp2 = LED_COUNT - temp
    tempList = []
    while temp2 > 0:
        tempList.append(temp2-1)
        temp2 -= GRID_WIDTH

    pixelGrid.insert(0, tempList)
    temp += 1

def getJSON(filePath):
    triesCounter = 0
    while True:
        try:  # Try opening the json file, and check it
            file = open(filePath)
            data = json.load(file)
            file.close()
            return data
        except Exception as ex:  # If you can't open the json file, just try again
            if triesCounter > 99:
                print(f'Exception has happened {triesCounter} times. Stopping script!')
                raise Exception(ex)
            else:
                print(f'Exception has happened {triesCounter} times')
                triesCounter += 1
                continue

def drawerSearchMode(data):
    for k, v in data['activePixels'].items():
        xy = k.split('-')
        rgb = v['color'].split('-')
        strip.setPixelColor(pixelGrid[int(xy[0])][int(xy[1])], Color(int(rgb[0]), rgb[1], rgb[2]))
    strip.show()
        
modes = {
    'standard': drawerSearchMode
}
        
if __name__ == '__main__':

    # Create NeoPixel object with appropriate configuration
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()
    
    while True:
        #strip.setPixelColor(pixelGrid[int(input('x: '))][int(input('y: '))], Color(0,0,0) if input('enter for on, o+enter for off: ') == 'o' else Color(255,255,255))
        data = getJSON('./data.json')
        mode = modes.get(data['mode'], None)
        mode(data)