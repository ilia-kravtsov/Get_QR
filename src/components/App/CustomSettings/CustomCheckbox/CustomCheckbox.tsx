import s from './CustomCheckbox.module.scss'
import {v4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {setQrExcavate} from "../../../../store/slices/qrSlice.ts";
import {selectQrExcavate} from "../../../../store/selectors.ts";

interface Props {
	size?: number;
	label?: string;
}

export const CustomCheckbox = ({
																 size = 24,
																 label
															 }: Props) => {
	const dispatch = useDispatch();
	const qrExcavate = useSelector(selectQrExcavate)
	const checkBoxId = `checkbox_id_${v4()}`
	const changeStatus = () => dispatch(setQrExcavate(!qrExcavate))

	return (
		<div className={s.container}>
			<label htmlFor={checkBoxId} onClick={changeStatus} className={s.label}>{label}</label>
			<div
				id={checkBoxId}
				className={s.checkbox}
				onClick={changeStatus}
				style={{width: size, height: size}}
			>
				<div
					className={`${s.innerSquare} ${qrExcavate ? s.checked : ""}`}
				/>
			</div>
		</div>
	);
};

