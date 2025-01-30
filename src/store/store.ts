import { configureStore } from '@reduxjs/toolkit'
import qrReducer from './slices/qrSlice.ts'
import languageSlice from './slices/languageSlice.ts'

export const store = configureStore({
  reducer: {
    qr: qrReducer,
    language: languageSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
