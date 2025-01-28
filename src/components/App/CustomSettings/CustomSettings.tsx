import { TQualityQRLevel } from "../common/types.ts";
import { FC } from "react";
import s from './CustomSettings.module.scss'
import CustomNumberInput from "./CustomNumberInput/CustomNumberInput.tsx";
import CustomSelect from "./CustomSelect/CustomSelect.tsx";

type CustomSettingsProps = {
	setBgColor: (color: string) => void;
	setFgColor: (color: string) => void;
	setSize: (size: number) => void;
	setLevel: (level: TQualityQRLevel) => void;
};

const CustomSettings: FC<CustomSettingsProps> = ({
																												 setBgColor,
																												 setFgColor,
																												 setSize,
																												 setLevel
																											 }) => {
	console.log('CustomSettings')
	const setSelectedValueCB = (value: TQualityQRLevel) => {
		setLevel(value)
	}

	return (
		<div className={s.container}>
			<div className={s.setting}>
				<label className={s.label}>Цвет фона</label>
				<input
					className={s.inputColor}
					type="color"
					onChange={(e) => setBgColor(e.target.value)}
					defaultValue="#ffffff"
				/>
			</div>

			<div className={s.setting}>
				<label className={s.label}>Цвет кода</label>
				<input
					className={s.inputColor}
					type="color"
					onChange={(e) => setFgColor(e.target.value)}
					defaultValue="#000000"
				/>
			</div>

			<CustomNumberInput setSizeCB={setSize}/>
			<CustomSelect setSelectedValueCB={setSelectedValueCB}/>
		</div>
	);
};

export default CustomSettings;
