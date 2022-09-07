const rgbToHex = (r: any, g : any, b: any) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export {rgbToHex};
