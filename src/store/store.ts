import {configureStore} from "@reduxjs/toolkit";
import qrReducer from './qrSlice.ts'

export const store = configureStore({
	reducer: {
		qr: qrReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;