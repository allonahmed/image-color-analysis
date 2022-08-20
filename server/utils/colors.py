from colorthief import ColorThief
from PIL import Image

#using color theif module to generate rgb of most used color in img returns array
def ct_dominant_color(image_path):
    return ColorThief(image_path).get_color(quality=1)

#using color theif module to generate rgb of most prominate colors in img returns 2d array
def ct_pallete_colors(image_path):
    return ColorThief(image_path).get_palette(color_count=6)    

#using Pillow library to generate colors in image
def get_colors(image_path):
    image = Image.open(image_path);
    return image.getcolors(maxcolors=806)

path = '../assets/flag.png'

#sort the list by pixel size 
def sort_list(list):
    list.sort(key = lambda x: x[0], reverse=True)
    return list

#returns accurate pallete of image (returns rgba of most popular pixel colors)
def get_color_pallete(path, count = 3):
    colors = sort_list(get_colors(path))
    pallete = []
    for i in range(0, count):
        pallete.append(colors[i][1])
    return pallete
