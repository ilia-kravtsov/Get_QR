import {ChangeEvent, useState} from "react";
import s from './CustomImageSize.module.scss'
import 'rc-slider/assets/index.css';
import {useDispatch} from "react-redux";
import {setImageSize} from "../../../../store/qrSlice.ts";

const CustomImageSize = () => {
	const dispatch = useDispatch();
	const [size, setSizeLocal] = useState<number>(3);

	const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newSize = parseFloat(e.target.value);
		setSizeLocal(newSize);
		dispatch(setImageSize(newSize))
	};

	return (
		<div className={s.container}>
			<label htmlFor="size-slider">Размер {size}</label>
			<input
				id="size-slider"
				type="range"
				min="1"
				max="7"
				step="1"
				value={size}
				onChange={handleOpacityChange}
				className={s.inputRange}
			/>
		</div>
	);
};

export default CustomImageSize


