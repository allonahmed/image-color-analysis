import { createSlice } from "@reduxjs/toolkit";

type imageColors = {
  colors: Array<number>;
  percentage: number;
};

type imageState = {
  image: File | null;
  imageColors: Array<imageColors> | null;
};

const initialState: imageState = {
  image: null,
  imageColors: null
};

const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    updateImage: (state: any, action: any) => {
      state.image = action.payload;
    },
    updateImageColors: (state: any, action: any) => {
      state.imageColors = action.payload;
    }
  }
});

export const { updateImage, updateImageColors } = imageSlice.actions;

export default imageSlice.reducer;
