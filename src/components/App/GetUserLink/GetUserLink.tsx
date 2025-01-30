import s from './GetUserLink.module.scss';
import {ChangeEvent, forwardRef, useState} from "react";
import {toast} from 'react-toastify';
import {toastConfig} from "../../../utils/constants.ts";
import {Button} from "../common/Button/Button.tsx";
import {setUserLink} from "../../../store/slices/qrSlice.ts";
import {useDispatch} from "react-redux";
import {isValidURL} from "../../../utils/validators.ts";
import {useTranslation} from "../../../utils/customHooks.ts";

export const GetUserLink = forwardRef<HTMLDivElement>((_, ref) => {
	const [link, setLinkLocal] = useState<string>('');
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleGetQRClick = () => {
		if (!link) {
			toast.error('Добавьте ссылку.', toastConfig);
			return;
		} else if (!isValidURL(link)) {
			toast.error('Некорректная ссылка.', toastConfig);
			return;
		} else {
			setLinkLocal('');
			dispatch(setUserLink(link));
			toast.success('Ваш QR-код создан.', toastConfig);
		}
	};
	const changeLink = (e: ChangeEvent<HTMLInputElement>) => setLinkLocal(e.currentTarget.value);

	return (
		<div className={s.container} ref={ref}>
			<input
				className={s.input}
				type="url"
				value={link}
				maxLength={2084}
				onChange={changeLink}
				placeholder={t('placeholderInput')}
			/>
			<Button title={t('buttonTitleGetUserLink')} onClickCB={handleGetQRClick}/>
		</div>
	);
});
