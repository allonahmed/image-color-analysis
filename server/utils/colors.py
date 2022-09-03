from colorthief import ColorThief
from PIL import Image
import numpy as np


def remove_background():
    im = Image.open('../assets/shattered.png')
    im = im.convert('RGBA')
    data = np.array(im)
    # just use the rgb values for comparison
    rgb = data[:,:,:3]
    color = [0,0,0]   # Original value
    black = [0,0,0, 255]
    white = [255,255,0,255]
    print(rgb);
    mask = np.all(rgb == color, axis = -1)
    # change all pixels that match color to white
    data[mask] = white

    # change all pixels that don't match color to black
    ##data[np.logical_not(mask)] = black
    new_im = Image.fromarray(data)
    new_im.save('../assets/redbg.png', "PNG")

#using color theif module to generate rgb of most used color in img returns array
def ct_dominant_color(image_path):
    return ColorThief(image_path).get_color(quality=3)

#using color theif module to generate rgb of most prominate colors in img returns 2d array
def ct_pallete_colors(image_path):
    return ColorThief(image_path).get_palette(color_count=2)    

#using Pillow library to generate colors in image
def get_colors(image_path, type = "RGBA"):
    image = Image.open(image_path);
    img = image.convert(type)
    return img.getcolors(maxcolors=80000006)

path = './assets/flag.png'

#sort the list by pixel size 
def sort_list(list):
    list.sort(key = lambda x: x[0], reverse=True)
    return list

def sort_list2(list):
    list.sort(key = lambda x: x[1])
    return list

#get pixel count of image
def total_pixels(path):
    image_size = Image.open(path).size;
    return image_size[0] * image_size[1]

#returns accurate pallete of image (returns rgba of most popular pixel colors)
def get_color_pallete(path, count = 200):
    # convertImage(path);
    # path = './assets/New.png'
    colors = sort_list(get_colors(path))
    pixels = total_pixels(path)
    pallete = []
    for i in range(0, count):
        if(colors[i][1] != (0,0,0,0)):
            pallete.append({
                    "color": colors[i][1],
                    "percentage": round(colors[i][0] / pixels, 8)
                })
    return pallete

def make_brians_teeth_yellow(path):
    img = Image.open(path)
    img = img.convert("RGBA")
 
    datas = img.getdata() 
    newData = []

    for item in datas:
        if item[0] > 180 and item[1] > 180 and item[2] > 180:
            newData.append((255, 255,0, 255))
        else:
            newData.append(item)
 
    img.putdata(newData)
    img.save("../assets/New.png", "PNG")
    print("Successful")

# make_brians_teeth_yellow('../assets/brian.png')

#iterate through each pixel in image and add it to a new array of objects. if the
# def test_color_sorting():
#     return NULL;

#convert image to L type then sort by L value (not count) *already sorted*
#create new object that contains colors that 
def clean_colors(path):
    colorCount = 0; #keeps track of the color count for the color make_brians_teeth_yello
    colorL = 0;
    count = 0 #keeps track of amount of colors in mash
    startColor = 0 #gets the starting count to compare with
    newData = []
    colors = get_colors(path, "RGBA")
    print('colors:',colors)
    # for i in range(0, len(colors)):
    #     # print(colors[i])
    #     if count == 0:
    #         startColor = colors[i][1] 
    #         colorL = colors[i][1]
    #         colorCount = colors[i][0]
    #         count += 1 
    #         # print("count 0")
    #     elif colors[i][1] - startColor <= 30:
    #         # print("colors[i][1] - startColor <= 30")
    #         colorCount+= colors[i][0]
    #         colorL += colors[i][1]
    #         count += 1
    #     else:
    #         newData.append((colorCount, colorL / count))
    #         count = 0

    img = Image.open(path)
    img = img.convert("P")
    img.putdata(newData, 1, 0)
    img.save("../assets/newData1.png", "PNG")
    newColors = get_colors('../assets/newData1.png', "RGBA")
    print('newColors:', newColors)
    # return newData

# print(clean_colors('../assets/redbg.png'))



