# This file is for testing code without having to put it on the raspberry pi

import os, json

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
    for x in data['activePixels']:
        xy = x.split('-')
        print(xy)
        
modes = {
    'standard': drawerSearchMode
}

data = getJSON('./data.json')
mode = modes.get(data['mode'], None)
mode(data)