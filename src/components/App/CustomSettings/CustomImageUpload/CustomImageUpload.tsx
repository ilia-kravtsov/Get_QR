import {ChangeEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setUserImage} from "../../../../store/qrSlice.ts";
import {toast} from "react-toastify";
import s from "./CustomImageUpload.module.scss";
import {Button} from "../../common/Button/Button.tsx";
import {toastConfig} from "../../../../utils/constants.ts";

export const CustomImageUpload = () => {
	const dispatch = useDispatch();
	const [imageUrl, setImageUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isValidImage, setIsValidImage] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		toast.info('Корректная ссылка заканчивается на .jpeg .jpg .png .gif .webp .svg', toastConfig)
	}, [error])

	const isDirectImageLink = (url: string): boolean => {
		return /\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(url);
	};

	const checkImageMimeType = async (url: string): Promise<boolean> => {
		try {
			const response = await fetch(url, { method: "HEAD" });
			const contentType = response.headers.get("Content-Type");
			return contentType?.startsWith("image/") || false;
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(`Ошибка при проверке MIME-типа изображения: ${error.message}`);
				toast.error('Ссылка не ведёт на прямую к файлу с изображением', toastConfig);
				setError(true)
			} else {
				toast.error('Неизвестная ошибка при проверке MIME-типа изображения', toastConfig);
				setError(true)
			}
			return false;
		}
	};

	const handleUrlChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		setImageUrl(url);

		if (!url) {
			setIsValidImage(false);
			setError(true)
			return;
		}

		if (!isDirectImageLink(url)) {
			toast.info("Введите корретную ссылку ;)", toastConfig)
			setError(true)
			return;
		}

		if (isDirectImageLink(url)) {
			setIsValidImage(true);
			setError(false)
		} else {
			const isValid = await checkImageMimeType(url);
			setIsValidImage(isValid);
			setError(!isValid)
		}
	};

	const handleImageUpload = async () => {
		if (error) {
			toast.info("Введите корретную ссылку ;)", toastConfig)
			return;
		}

		if (!imageUrl) {
			toast.info("Изображение не загружено", toastConfig);
			setError(true)
			return;
		}

		setIsLoading(true);

		if (!isValidImage) {
			toast.info("Ссылка не является прямой ссылкой на изображение", toastConfig);
			setIsLoading(false);
			setError(true)
			return;
		}

		dispatch(setUserImage(imageUrl));
		toast.info("Изображение добавилось на QR", toastConfig);
		setImageUrl("");
		setIsValidImage(false);
		setIsLoading(false);
		setError(false)
	};

	const handleImageLoad = () => setIsLoading(false);

	return (
		<div className={s.container}>
			<div className={s.inputUrlBox}>
				<label htmlFor="url-input">Вставьте прямую ссылку на изображение:</label>
				<span>Они заканчиваются на .jpeg .jpg .png .gif .webp .svg</span>
				<input
					type="text"
					id="url-input"
					placeholder="https://example.com/images/photo.jpg"
					onChange={handleUrlChange}
					className={s.inputUrl}
					value={imageUrl}
					maxLength={2084}
				/>
			</div>

			<div className={s.imageAndButtonContainer}>
				{imageUrl && isValidImage && (
					<figure className={`${s.previewBox} ${imageUrl && isValidImage ? s.previewBoxVisible : ""}`}>
						<figcaption className={s.previewBoxCaption}>
							<p>Просмотр загруженного изображения</p>
							<p>Скорость отображения зависит от интернет соединения</p>
						</figcaption>
						{isLoading && <div className={s.spinner}></div>}
						<img
							src={imageUrl}
							alt=""
							className={s.imageUrl}
							onLoad={handleImageLoad}
						/>
					</figure>
				)}

				{imageUrl && isValidImage && (
					<Button
						title={isLoading ? "Загрузка..." : "Добавить изображение на QR"}
						onClickCB={handleImageUpload}
						size={true}
						disabled={error}
					/>
				)}
			</div>
		</div>
	);
};
