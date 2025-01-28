import {ChangeEvent, useState} from "react";
import s from './CustomImageOpacity.module.scss'
import 'rc-slider/assets/index.css';
import {useDispatch} from "react-redux";
import {setOpacity} from "../../../../store/qrSlice.ts";

export const CustomImageOpacity = () => {
	const dispatch = useDispatch();
	const [opacity, setOpacityLocal] = useState<number>(0.5);

	const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newOpacity = parseFloat(e.target.value);
		setOpacityLocal(newOpacity);
		dispatch(setOpacity(newOpacity))
	};

	return (
		<div className={s.container}>
			<label htmlFor="opacity-slider">Прозрачность {opacity.toFixed(2)}</label>
			<input
				id="opacity-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={opacity}
				onChange={handleOpacityChange}
				className={s.inputRange}
			/>
		</div>
	);
};

