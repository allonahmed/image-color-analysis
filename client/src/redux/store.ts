import { configureStore } from '@reduxjs/toolkit'
import imageReducer from './reducers/image'
import systemReducer from './reducers/system'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        image: imageReducer,
        system: systemReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;