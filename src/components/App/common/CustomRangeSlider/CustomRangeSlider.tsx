import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./CustomRangeSlider.module.scss";
import {PayloadAction} from "@reduxjs/toolkit";
import {toastConfig} from "../../../../utils/constants.ts";
import {toast} from "react-toastify";
import {selectUserImageLink} from "../../../../store/selectors.ts";

interface CustomRangeSliderProps {
	label: string;
	min: number;
	max: number;
	step: number;
	initialValue: number;
	onChange: (value: number) => PayloadAction<number>;
}

export const CustomRangeSlider = ({ label, min, max, step, initialValue, onChange }: CustomRangeSliderProps) => {
	const dispatch = useDispatch();
	const userImageLink = useSelector(selectUserImageLink);
	const [value, setValue] = useState<number>(initialValue);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!userImageLink && label === 'Прозрачность изображения' || !userImageLink && label === 'Размер изображения') {
			toast.info('Сначала загрузите изображение в поле ниже.', toastConfig);
			return;
		}
		const newValue = parseFloat(e.target.value);
		setValue(newValue);
		dispatch(onChange(newValue));
	};

	return (
		<div className={s.container}>
			<label className={s.labelBox} htmlFor={`${label}-slider`}>
				<span className={s.label}>{label}</span>
			</label>
			<span className={s.amount}>{value.toFixed(step < 1 ? 2 : 0)}</span>
			<input
				id={`${label}-slider`}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				className={s.inputRange}
			/>
		</div>
	);
};
