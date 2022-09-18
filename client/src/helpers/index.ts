// converts rgb string to hex format
const rgbToHex = (r: number, g : number, b: number) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

//converts hex to rgb
const hexToRgb = (hex: string) =>{
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

//returns color (black or white based on brightness of inputted color)
const getContrast = (rgb: any) => {
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125 ? 'black' : 'white';
};

export { rgbToHex, hexToRgb, getContrast };
