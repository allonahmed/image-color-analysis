import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type imageColors = {
  color: Array<number>;
  percentage: number;
};

export type imageState = {
  image: any;
  imageType: string | null
  imageColors: Array<imageColors> | null;
  current: any
};

const initialState: imageState = {
  image: null,
  imageType: null,
  imageColors: null,
  current: null
};

const imageSlice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    updateImage: (state, action: any) => {
      state.image = action.payload;
    },
    updateImageColors: (state, action: PayloadAction<imageColors[]>) => {
      state.imageColors = action.payload;
    },
    updateCurrent: (state, action: PayloadAction<any>) => {
      state.current = action.payload;
    },
    updateImageType: (state, action: any) =>  {
      let image = null;
      fetch(action.payload)
        .then(async response => {
          const blob = await response.blob();
          image = `${blob.type.substring(6,blob.type.length)}`;
          console.log(image);
        }).catch((err)=> console.log(err));
      state.imageType = image;
    }
  }
});

export const { updateImage, updateImageColors, updateCurrent, updateImageType } = imageSlice.actions;

export default imageSlice.reducer;
