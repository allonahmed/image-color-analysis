import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type systemState = {
  loading: boolean;
  modalOpen: boolean;
}

const initialState: systemState = {
  loading: false,
  modalOpen: false
};

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { updateLoading, updateModal } = systemSlice.actions;

export default systemSlice.reducer;