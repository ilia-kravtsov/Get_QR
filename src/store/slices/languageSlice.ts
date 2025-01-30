import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Language = 'en' | 'ru'

interface languageState {
  language: Language
}

const initialState: languageState = {
  language: 'ru',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload
    },
  },
})

export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer
