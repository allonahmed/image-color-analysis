# from PIL import Image #pillow library to get all colors from image
# from collections import defaultdict

# img = Image.open('./assets/american-flag.jpeg')
# # colors = defaultdict(int)

# # for pixel in img.getdata():
# #     colors[pixel] +=1

# # print(colors);

# colors = img.getcolors()

# print(colors)

from colorthief import ColorThief

image_path = './assets/american-flag.jpeg'

color_thief = ColorThief(image_path)
# get the dominant color
dominant_color = color_thief.get_color(quality=1)
# build a color palette
palette = color_thief.get_palette(color_count=6)

print('dominant color:',dominant_color)
print('color pallete:', palette)