import { createSlice } from '@reduxjs/toolkit'

type systemState = {
    loading: boolean;
}

const initialState: systemState = {
    loading: false
}

const systemSlice = createSlice({
    name: 'system',
    initialState: initialState,
    reducers: {
        updateLoading: (state: any, action: any) => {
            state.loading = action.payload;
        },
    },
})

export const { updateLoading } = systemSlice.actions

export default systemSlice.reducer