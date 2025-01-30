import { RootState } from "./store";

export const selectUserImageLink = (state: RootState) => state.qr.userImageLink;
export const selectUserLink = (state: RootState) => state.qr.userLink;
export const selectOpacity = (state: RootState) => state.qr.opacity;
export const selectBgColor = (state: RootState) => state.qr.bgColor;
export const selectFgColor = (state: RootState) => state.qr.fgColor;
export const selectSize = (state: RootState) => state.qr.size;
export const selectLevel = (state: RootState) => state.qr.level;
export const selectImageSize = (state: RootState) => state.qr.imageSize;
export const selectQrExcavate = (state: RootState) => state.qr.qrExcavate;
export const selectMinMaxImageQRSize = (state: RootState) => state.qr.minMaxImageQRSize;

export const languageSelect = (state: RootState) => state.language.language