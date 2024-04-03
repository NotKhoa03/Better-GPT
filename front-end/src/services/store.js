import { configureStore } from '@reduxjs/toolkit'
import { chatAPI } from './chatgpt'
export const store = configureStore({
    reducer: {
        [chatAPI.reducerPath]: chatAPI.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(chatAPI.middleware)
})