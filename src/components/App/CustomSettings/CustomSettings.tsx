import s from './CustomSettings.module.scss'
import CustomNumberInput from "./CustomNumberInput/CustomNumberInput.tsx";
import CustomSelect from "./CustomSelect/CustomSelect.tsx";
import {CustomColor} from "./CustomColor/CustomColor.tsx";
import {CustomImageOpacity} from "./CustomImageOpacity/CustomImageOpacity.tsx";
import {CustomImageUpload} from "./CustomImageUpload/CustomImageUpload.tsx";
import CustomImageSize from "./CustomImageSize/CustomImageSize.tsx";

const CustomSettings = () => {
	return (
		<div className={s.container}>
			<h3 className={s.settingsHeader}>Настройки QR:</h3>
			<div className={s.settingsFirstBox}>
				<CustomColor colorType={'Back'} defaultColor={'#ffffff'}/>
				<CustomColor colorType={'Front'} defaultColor={'#000000'}/>
				<CustomNumberInput/>
				<CustomSelect/>
			</div>
			<h3 className={s.settingsHeader}>Настройки изображения на QR:</h3>
			<div className={s.settingsSecondBox}>
				<CustomImageOpacity/>
				<CustomImageSize/>
			</div>
			<h3 className={s.settingsHeader}>Загрузка изображения на QR:</h3>
			<CustomImageUpload/>
		</div>
	);
};

export default CustomSettings;
