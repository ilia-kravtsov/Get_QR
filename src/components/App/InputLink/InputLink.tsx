import s from './InputLink.module.scss';
import {ChangeEvent, useState} from "react";
import {toast} from 'react-toastify';
import {toastConfig} from "../../../utils/constants.ts";
import {Button} from "../common/Button/Button.tsx";
import {setLink} from "../../../store/qrSlice.ts";
import {useDispatch} from "react-redux";

export const InputLink = () => {
	const [link, setLinkLocal] = useState<string>('');
	const dispatch = useDispatch();

	const isValidURL = (url: string): boolean => {
		const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
		return regex.test(url);
	};
	const handleGetQRClick = () => {
		if (link) {
			if (isValidURL(link)) {
				dispatch(setLink(link));
				setLinkLocal('');
				toast.success('Ваш QR-код создан.', toastConfig);
			} else {
				toast.error('Некорректная ссылка. Попробуйте еще раз.', toastConfig);
			}
		} else {
			toast.error('Добавьте ссылку.', toastConfig);
		}
	};
	const changeLink = (e: ChangeEvent<HTMLInputElement>) => setLinkLocal(e.currentTarget.value);

	return (
		<div className={s.container}>
			<input
				className={s.input}
				type="url"
				value={link}
				maxLength={2084}
				onChange={changeLink}
				placeholder={'https://www.example.com'}
			/>
			<Button title={'Получить QR'} onClickCB={handleGetQRClick}/>
		</div>
	);
};
