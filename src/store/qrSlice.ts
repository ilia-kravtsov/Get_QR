import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TQualityQRLevel } from "../components/App/common/types.ts";

interface QRState {
	userLink: string;
	bgColor: string;
	fgColor: string;
	size: number;
	level: TQualityQRLevel;
	opacity: number;
	imageSize: number;
	userImageLink: string;
	qrExcavate: boolean;
}

const initialState: QRState = {
	userLink: '',
	bgColor: '#ffffff',
	fgColor: '#000000',
	size: 256,
	level: 'H',
	opacity: 0.5,
	imageSize: 3,
	userImageLink: '',
	qrExcavate: false
};

const qrSlice = createSlice({
	name: 'qr',
	initialState,
	reducers: {
		setUserLink(state, action: PayloadAction<string>) {
			state.userLink = action.payload;
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
		setUserImage(state, action: PayloadAction<string>) {
			state.userImageLink = action.payload;
		},
		setOpacity(state, action: PayloadAction<number>) {
			state.opacity = action.payload;
		},
		setImageSize(state, action: PayloadAction<number>) {
			state.imageSize = action.payload;
		},
		setQrExcavate(state, action: PayloadAction<boolean>) {
			state.qrExcavate = action.payload;
		}
	},
});

export const {
	setUserLink,
	setBgColor,
	setFgColor,
	setSize,
	setLevel,
	setOpacity,
	setImageSize,
	setUserImage,
	setQrExcavate
} = qrSlice.actions;

export default qrSlice.reducer;
