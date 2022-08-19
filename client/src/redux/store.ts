import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './reducers/image'

export default configureStore({
    reducer: {
        counter: imageReducer,
    },
})