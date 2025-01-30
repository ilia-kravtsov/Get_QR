import s from './CustomSelect.module.scss';
import {useEffect, useRef, useState} from 'react';
import {TQualityQRLevel} from '../../common/types.ts';
import {useDispatch} from 'react-redux';
import {setLevel} from '../../../../store/slices/qrSlice.ts';
import {useTranslation} from '../../../../utils/customHooks.ts';

const CustomSelect = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<TQualityQRLevel>('H');
	const selectRef = useRef<HTMLDivElement | null>(null);
	const { t } = useTranslation();

	// для закрытия селектора по клику во вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		// Очистка события при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleSelect = (value: TQualityQRLevel) => {
		setSelectedValue(value);
		setIsOpen(false);
		if (value) {
			dispatch(setLevel(value));
		}
	};

	return (
		<div className={s.setting}>
			<label className={s.label}>{t('labelSelect')}</label>
			<div className={s.customSelect} onClick={toggleDropdown} ref={selectRef}>
				<div className={s.selectedOption}>
					{selectedValue === 'H' && `${t('valueSelectH')}`}
					{selectedValue === 'Q' && `${t('valueSelectQ')}`}
					{selectedValue === 'M' && `${t('valueSelectM')}`}
					{selectedValue === 'L' && `${t('valueSelectL')}`}
				</div>
				<div className={`${s.dropdownIcon} ${isOpen ? s.open : ''}`}></div>
				{isOpen && (
					<ul className={`${s.optionsList} ${isOpen ? s.open : ''}`}>
						<li onClick={() => handleSelect('H')}>{t('valueSelectH')}</li>
						<li onClick={() => handleSelect('Q')}>{t('valueSelectQ')}</li>
						<li onClick={() => handleSelect('M')}>{t('valueSelectM')}</li>
						<li onClick={() => handleSelect('L')}>{t('valueSelectL')}</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default CustomSelect;