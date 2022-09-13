import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ImageData } from '../../types';

export type imageColors = {
  color: Array<number>;
  percentage: number;
};

export type imageState = {
  imageUrl: any;
  imageType: string | null | any
  imageColors: Array<imageColors> | null;
  imageData: ImageData
  related: ImageData[];
};

const initialState: imageState = {
  imageUrl: null,
  imageType: null,
  imageColors: null,
  imageData: null,
  related: []
};

export const fetchImageType = createAsyncThunk('image/fetchImage', 
  async (img : string, { dispatch }) => {
    return await fetch(img)
      .then(async response => {
        const blob = await response.blob();
        dispatch(updateImage(img));
        return `${blob.type.substring(6,blob.type.length)}`;
      }).catch((err)=> console.log(err));
  });

const imageSlice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    updateImage: (state, action: any) => {
      let url = action.payload;
      if(url.includes('images.stockx')){
        url = url.replace('bg=FFFFFF', 'bg=222222');
      }
      state.imageUrl = url;
    },
    updateImageColors: (state, action: PayloadAction<imageColors[]>) => {
      state.imageColors = action.payload;
    },
    updateImageData: (state, action: PayloadAction<any>) => {
      state.imageData = action.payload;
    },
    updatedRelated: (state, action: PayloadAction<any>) => {
      state.related = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchImageType.pending, (state, action) => {
      console.log('loading');
    }),
    builder.addCase(fetchImageType.fulfilled, (state, action) => {
      state.imageType = action.payload;
    }),
    builder.addCase(fetchImageType.rejected, (state, action) => {
      console.log('failed to get image type');
    });
  }
});

export const { updateImage, updateImageColors, updateImageData, updatedRelated } = imageSlice.actions;

export default imageSlice.reducer;
