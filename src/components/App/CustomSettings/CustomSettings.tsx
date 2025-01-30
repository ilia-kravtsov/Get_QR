import s from './CustomSettings.module.scss'
import CustomSelect from "./CustomSelect/CustomSelect.tsx";
import {CustomColor} from "./CustomColor/CustomColor.tsx";
import {CustomImageUpload} from "./CustomImageUpload/CustomImageUpload.tsx";
import {CustomRangeSlider} from "../common/CustomRangeSlider/CustomRangeSlider.tsx";
import {setImageSize, setOpacity, setSize} from "../../../store/slices/qrSlice.ts";
import {CustomCheckbox} from "./CustomCheckbox/CustomCheckbox.tsx";
import {DeleteImage} from "./DeleteImage/DeleteImage.tsx";
import {useTranslation} from "../../../utils/customHooks.ts";

type Props = {
	handleImageUpload: () => void
}

const CustomSettings = ({handleImageUpload}: Props) => {
	const { t } = useTranslation();
	return (
		<div className={s.container}>
			<h3 className={s.settingsHeader}>{t('titleSettingsQR')}</h3>
			<div className={s.settingsFirstBox}>
				<CustomColor colorType={'Back'} defaultColor={'#ffffff'}/>
				<CustomColor colorType={'Front'} defaultColor={'#000000'}/>
				<CustomRangeSlider
					label={t('labelQRSizeSlider')}
					min={100}
					max={256}
					step={1}
					initialValue={256}
					onChange={setSize}
				/>
				<CustomCheckbox size={30} label={t('labelCheckbox')}/>
				<CustomSelect/>
			</div>
			<h3 className={s.settingsHeader}>{t('titleSettingsImage')}</h3>
			<p className={s.settingsSubHeader}>{t('titleSettingsImageUploadSub')}</p>
			<div className={s.settingsSecondBox}>
				<div className={s.settingsSliderBox}>
					<CustomRangeSlider
						label={t('sliderImageOpacity')}
						min={0}
						max={1}
						step={0.01}
						initialValue={0.5}
						onChange={setOpacity}
					/>
					<CustomRangeSlider
						label={t('sliderImageSize')}
						min={1}
						max={7}
						step={1}
						initialValue={3}
						onChange={setImageSize}
					/>
				</div>
				<DeleteImage/>
			</div>
			<h3 className={s.settingsHeader}>{t('titleSettingsImageUpload')}</h3>
			<CustomImageUpload handleImageUploadCB={handleImageUpload}/>
		</div>
	);
};

export default CustomSettings;
