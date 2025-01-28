import {ToastOptions} from "react-toastify";
import { v4 } from "uuid";

export const toastConfig: ToastOptions  = {
	position: 'bottom-left',
	autoClose: 2500,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'light',
	toastId: v4(),
	progress: null,
};