from colorthief import ColorThief

def dominant_color(image_path):
    return ColorThief(image_path).get_color(quality=1)

def pallete_colors(image_path):
    return ColorThief(image_path).get_palette(color_count=3)    
