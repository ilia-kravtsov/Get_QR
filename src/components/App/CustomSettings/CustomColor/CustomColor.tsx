import s from "./CustomColor.module.scss";
import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {setBgColor, setFgColor} from "../../../../store/qrSlice.ts";

type TColorType = 'Back' | 'Front'

type Props = {
	colorType: TColorType;
	defaultColor: string
}

export const CustomColor = ({colorType, defaultColor}: Props) => {
	const dispatch = useDispatch();

	const setSelectedColor = (e: ChangeEvent<HTMLInputElement>) => {
		if (colorType === 'Back') {
			dispatch(setBgColor(e.target.value));
		} else if (colorType === 'Front') {
			dispatch(setFgColor(e.target.value));
		}
	};

	return (
		<div className={s.setting}>
			<label className={s.label}>
				{colorType === 'Back' ? 'Цвет фона' : 'Цвет кода'}
			</label>
			<input
				className={s.inputColor}
				type="color"
				onChange={setSelectedColor}
				defaultValue={defaultColor}
			/>
		</div>
	);
};

