import s from './CustomSettings.module.scss'
import CustomSelect from "./CustomSelect/CustomSelect.tsx";
import {CustomColor} from "./CustomColor/CustomColor.tsx";
import {CustomImageUpload} from "./CustomImageUpload/CustomImageUpload.tsx";
import {CustomRangeSlider} from "../common/CustomRangeSlider/CustomRangeSlider.tsx";
import {setImageSize, setOpacity, setSize} from "../../../store/qrSlice.ts";
import {CustomCheckbox} from "./CustomCheckbox/CustomCheckbox.tsx";

const CustomSettings = () => {
	return (
		<div className={s.container}>
			<h3 className={s.settingsHeader}>Настройки:</h3>
			<div className={s.settingsFirstBox}>
				<CustomColor colorType={'Back'} defaultColor={'#ffffff'}/>
				<CustomColor colorType={'Front'} defaultColor={'#000000'}/>
				<CustomCheckbox size={50} label={'Удалить код под картинкой'}/>
				<CustomSelect/>
			</div>
			<div className={s.settingsSecondBox}>
				<CustomRangeSlider
					label="Размер кода"
					min={100}
					max={256}
					step={1}
					initialValue={256}
					onChange={setSize}
				/>
				<CustomRangeSlider
					label="Прозрачность изображения"
					min={0}
					max={1}
					step={0.01}
					initialValue={0.5}
					onChange={setOpacity}
				/>
				<CustomRangeSlider
					label="Размер изображения"
					min={1}
					max={7}
					step={1}
					initialValue={3}
					onChange={setImageSize}
				/>
			</div>
			<h3 className={s.settingsHeader}>Загрузка изображения на QR:</h3>
			<CustomImageUpload/>
		</div>
	);
};

export default CustomSettings;
