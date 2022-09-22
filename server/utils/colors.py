# from colorthief import ColorThief
from PIL import Image
import numpy as np
from webptools import dwebp, grant_permission # for converting webp to pil supported type
import imghdr # for getting image type

#removes white background and makes image transparent
def transparentBackground(path):
    img = Image.open(path)
    img = img.convert("RGBA")
    datas, newData = img.getdata(), [] 
    for item in datas:
        if item[0] >= 245 and item[1] >= 245 and item[2] >= 245:
            newData.append((0,0,0,0))
        else:
            newData.append(item)
    img.putdata(newData)
    img.save('./assets/transparent.png', "PNG")
    return './assets/transparent.png'

#using color theif module to generate rgb of most used color in img returns array
# def ct_dominant_color(image_path):
#     return ColorThief(image_path).get_color(quality=3)

#converts webp to png 
def convert(image_path):
    if(imghdr.what(image_path) == 'webp'):
        dwebp(image_path, './assets/convert2png.png', "-o")
        return './assets/convert2png.png'
    else:
        return image_path

#using color theif module to generate rgb of most prominate colors in img returns 2d array
# def ct_pallete_colors(image_path):
#     if(imghdr.what(image_path) == 'webp'):
#         image_path = convert(image_path)
#     return ColorThief(image_path).get_palette(color_count=2)    

#using Pillow library to generate colors in image
def get_colors(image_path, type = "RGBA"):
    image = Image.open(image_path);
    img = image.convert(type)
    return img.getcolors(maxcolors=80000006)

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

#using pil quantized module to quantize 
def QuantizeImage(image_path):
    im = Image.open(image_path).convert("RGBA")
    im1 = im.quantize(10) 
    im1.save('./assets/quantized.png', "PNG")
    return './assets/quantized.png'

#returns accurate pallete of image (returns rgba of most popular pixel colors)
def get_color_pallete(path, count = 3):
    #get img path of images after processing performed
    path = convert(path)
    path = transparentBackground(path)
    path = QuantizeImage(path)

    #get data such as sorted colors by count and pixel count
    colors = sort_list(get_colors(path))
    pixels = total_pixels(path)

    #removes transparent pixels from data
    if(colors[0][1] == (0,0,0,0)):
        pixels = pixels - colors[0][0]
        colors.pop(0)

    print('colors:', colors)
    print('pixel count:', pixels)
    
    pallete = []
    for i in range(0, count):
        pallete.append({
                "color": colors[i][1],
                "percentage": round(colors[i][0] / (pixels), 8)
            })

    return pallete





