import {ChangeEvent, FocusEvent, useState} from "react";
import s from "./CustomNumberInput.module.scss";
import {toast} from 'react-toastify';
import {useDispatch} from "react-redux";
import {toastConfig} from "../../../../utils/constants.ts";
import {setSize} from "../../../../store/qrSlice.ts";

const CustomNumberInput = () => {
	const dispatch = useDispatch();
	const [size, setSizeLocal] = useState<number>(256);
	const increaseSize = () => {
		setSizeLocal((prev) => {
			const newSize = Math.min(prev + 10, 256);
			dispatch(setSize(newSize));
			if (newSize === 256) {
				toast.info('Максимальный размер QR-кода: 256', toastConfig);
			}
			return newSize;
		});
	};

	const decreaseSize = () => {
		setSizeLocal((prev) => {
			const newSize = Math.max(prev - 10, 100);
			dispatch(setSize(newSize));
			if (newSize === 100) {
				toast.info('Минимальный размер QR-кода: 100', toastConfig);
			}
			return newSize;
		});
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (value > 256) {
			toast.error('Размер не может быть больше 256', toastConfig);
			setSizeLocal(256);
			dispatch(setSize(256));
		} else if (value < 100) {
			toast.error('Размер не может быть меньше 100', toastConfig);
			setSizeLocal(100);
			dispatch(setSize(100));
		} else {
			setSizeLocal(value);
			dispatch(setSize(value));
		}
	};

	const handleSizeBlur = (e: FocusEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		if (value < 100) {
			setSizeLocal(100);
			dispatch(setSize(100));
		} else if (value > 256) {
			setSizeLocal(256);
			dispatch(setSize(256));
		} else {
			setSizeLocal(value);
			dispatch(setSize(value));
		}
	};

	return (
		<div className={s.setting}>
			<label className={s.label}>Размер</label>
			<div className={s.numberInputWrapper}>
				<input
					type="number"
					min="100"
					max="256"
					value={size}
					onChange={handleInputChange}
					onBlur={handleSizeBlur}
					className={s.input}
				/>
				<div className={s.buttons}>
					<button className={s.button} onClick={decreaseSize}>-</button>
					<button className={s.button} onClick={increaseSize}>+</button>
				</div>
			</div>
		</div>
	);
};

export default CustomNumberInput;
