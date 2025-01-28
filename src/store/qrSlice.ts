import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TQualityQRLevel } from "../components/App/common/types.ts";

interface QRState {
	link: string;
	bgColor: string;
	fgColor: string;
	size: number;
	level: TQualityQRLevel;
	opacity: number;
	imageSize: number;
}

const initialState: QRState = {
	link: '',
	bgColor: '#ffffff',
	fgColor: '#000000',
	size: 256,
	level: 'H',
	opacity: 0.5,
	imageSize: 3,
};

const qrSlice = createSlice({
	name: 'qr',
	initialState,
	reducers: {
		setLink(state, action: PayloadAction<string>) {
			state.link = action.payload;
		},
		setBgColor(state, action: PayloadAction<string>) {
			state.bgColor = action.payload;
		},
		setFgColor(state, action: PayloadAction<string>) {
			state.fgColor = action.payload;
		},
		setSize(state, action: PayloadAction<number>) {
			state.size = action.payload;
		},
		setLevel(state, action: PayloadAction<TQualityQRLevel>) {
			state.level = action.payload;
		},
		setOpacity(state, action: PayloadAction<number>) {
			state.opacity = action.payload;
		},
		setImageSize(state, action: PayloadAction<number>) {
			state.imageSize = action.payload;
		}
	},
});

export const {
	setLink,
	setBgColor,
	setFgColor,
	setSize,
	setLevel,
	setOpacity,
	setImageSize
} = qrSlice.actions;

export default qrSlice.reducer;
