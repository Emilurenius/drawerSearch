from math import floor

GRID_WIDTH  = 3
GRID_HEIGHT = 3
LED_COUNT = GRID_WIDTH * GRID_HEIGHT     # Number of LED pixels.
LED_PIN = 18      # GPIO pin connected to the pixels (18 uses PWM!).
# LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
# True to invert the signal (when using NPN transistor level shift)
LED_INVERT = False
LED_CHANNEL = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

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

print(pixelGrid)