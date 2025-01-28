import {ChangeEvent, FocusEvent, useState} from "react";
import s from "./CustomNumberInput.module.scss";
import {toast} from 'react-toastify';
import {toastConfig} from "../../../../utils/constants.ts";

type Props = {
	setSizeCB: (size: number) => void;
}

const CustomNumberInput = ({ setSizeCB }: Props) => {
	const [size, setSize] = useState<number>(256);
	console.log('CustomNumberInput')
	const increaseSize = () => {
		setSize((prev) => {
			const newSize = Math.min(prev + 10, 256);
			setSizeCB(newSize);
			if (newSize === 256) {
				toast.info('Максимальный размер QR-кода: 256', toastConfig);
			}
			return newSize;
		});
	};

	const decreaseSize = () => {
		setSize((prev) => {
			const newSize = Math.max(prev - 10, 100);
			setSizeCB(newSize);
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
			setSize(256);
			setSizeCB(256);
		} else if (value < 100) {
			toast.error('Размер не может быть меньше 100', toastConfig);
			setSize(100);
			setSizeCB(100);
		} else {
			setSize(value);
			setSizeCB(value);
		}
	};

	const handleSizeBlur = (e: FocusEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		if (value < 100) {
			setSize(100);
			setSizeCB(100);
		} else if (value > 256) {
			setSize(256);
			setSizeCB(256);
		} else {
			setSize(value);
			setSizeCB(value);
		}
	};

	return (
		<div className={s.setting}>
			<label className={s.label}>Размер:</label>
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
