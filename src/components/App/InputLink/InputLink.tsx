import s from './InputLink.module.scss';
import {ChangeEvent, useState} from "react";
import {toast} from 'react-toastify';
import {toastConfig} from "../../../utils/constants.ts";
import {Button} from "../common/Button/Button.tsx";

type Props = {
	linkCB: (link: string) => void;
};

export const InputLink = ({ linkCB }: Props) => {
	const [link, setLink] = useState<string>('');
	console.log('InputLink')
	const isValidURL = (url: string): boolean => {
		const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
		return regex.test(url);
	};
	const handleGetQRClick = () => {
		if (link) {
			if (isValidURL(link)) {
				linkCB(link);
				setLink('');
				toast.success('Ваш QR-код создан.', toastConfig);
			} else {
				toast.error('Некорректная ссылка. Попробуйте еще раз.', toastConfig);
			}
		} else {
			toast.error('Добавьте ссылку.', toastConfig);
		}
	};
	const changeLink = (e: ChangeEvent<HTMLInputElement>) => setLink(e.currentTarget.value);

	return (
		<div className={s.container}>
			<div className={s.inputErrorBox}>
				<input
					className={s.input}
					type="url"
					value={link}
					maxLength={2084}
					onChange={changeLink}
					placeholder={'Введите ссылку'}
				/>
			</div>
			<Button title={'Get QR'} onClickCB={handleGetQRClick}/>
		</div>
	);
};
