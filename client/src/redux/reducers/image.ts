import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type imageColors = {
  color: Array<number>;
  percentage: number;
};

export type imageState = {
  image: any;
  imageColors: Array<imageColors> | null;
};

const initialState: imageState = {
  image: null,
  imageColors: null
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
    }
  }
});

export const { updateImage, updateImageColors } = imageSlice.actions;

export default imageSlice.reducer;
