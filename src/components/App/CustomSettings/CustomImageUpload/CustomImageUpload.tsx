import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {setLink} from "../../../../store/qrSlice.ts";
import {toast} from "react-toastify";
import s from './CustomImageUpload.module.scss'
import {Button} from "../../common/Button/Button.tsx";
import {toastConfig} from "../../../../utils/constants.ts";

export const CustomImageUpload = () => {
	const dispatch = useDispatch();
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
	};

	const handleImageUpload = () => {
	    if (imageUrl) {
				dispatch(setLink(imageUrl));
				toast.info('Изображение добавилось на QR', toastConfig)
			} else {
				toast.info('Изображение не загружено')
			}
	}

	const handleImageLoad = () => setIsLoading(false);

	const handleImageError = () => {
		setIsLoading(false);
		toast.error('Ошибка загрузки изображения');
	};

	const handleIsLoading = () => setIsLoading(true)

	return (
		<div className={s.container}>
			<div className={s.inputUrlBox}>
				<label htmlFor="url-input">Вставьте прямую ссылку на изображение:</label>
				<input
					type="text"
					id="url-input"
					placeholder={'https://example.com/images/photo.jpg'}
					onChange={handleUrlChange}
					className={s.inputUrl}
				/>
			</div>

			<div>
				{
					imageUrl &&
					<figure className={s.previewBox}>
						<figcaption>Просмотр загруженного изображения</figcaption>
						{isLoading && <div className={s.spinner}></div>}
						<img
							src={imageUrl}
							alt="Image from URL"
							className={s.imageUrl}
							onLoad={handleImageLoad}
							onError={handleImageError}
							onClick={handleIsLoading}
						/>
					</figure>
				}
			</div>

			{imageUrl && <Button title={'Добавить изображение на QR'} onClickCB={handleImageUpload} size={true}/>}
		</div>
	);
};
