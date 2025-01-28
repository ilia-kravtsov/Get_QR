import s from './CustomSelect.module.scss';
import {useEffect, useRef, useState} from "react";
import {TQualityQRLevel} from "../../common/types.ts";

type Props = {
	setSelectedValueCB: (selectedValue: TQualityQRLevel) => void;
}

const CustomSelect = ({setSelectedValueCB}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState("L");
	const selectRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// Очистка события при размонтировании компонента
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleSelect = (value: TQualityQRLevel) => {
		setSelectedValue(value);
		setIsOpen(false);
		if (value) {
			setSelectedValueCB(value);
		}
	};

	return (
		<div className={s.setting}>
			<label className={s.label}>Качество</label>
			<div className={s.customSelect} onClick={toggleDropdown} ref={selectRef}>
				<div className={s.selectedOption}>
					{selectedValue === "L" && "Низкое"}
					{selectedValue === "M" && "Среднее"}
					{selectedValue === "Q" && "Выше среднего"}
					{selectedValue === "H" && "Высокий"}
				</div>
				<div className={`${s.dropdownIcon} ${isOpen ? s.open : ""}`}></div>
				{isOpen && (
					<ul className={`${s.optionsList} ${isOpen ? s.open : ""}`}>
						<li onClick={() => handleSelect("L")}>Низкое</li>
						<li onClick={() => handleSelect("M")}>Среднее</li>
						<li onClick={() => handleSelect("Q")}>Выше среднего</li>
						<li onClick={() => handleSelect("H")}>Высокий</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default CustomSelect;