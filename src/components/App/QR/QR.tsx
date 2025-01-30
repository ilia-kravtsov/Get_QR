import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import {toast} from 'react-toastify';
import s from './QR.module.scss';
import {toastConfig} from "../../../utils/constants.ts";
import {useRef} from "react";
import {Button} from "../common/Button/Button.tsx";
import {useSelector} from "react-redux";
import {
	selectBgColor,
	selectFgColor, selectImageSize, selectLevel, selectMinMaxImageQRSize,
	selectOpacity, selectQrExcavate,
	selectSize,
	selectUserImageLink
} from "../../../store/selectors.ts";
import {useTranslation} from "../../../utils/customHooks.ts";

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

type Props = {
	userLink: string
}

export const QR = ({userLink}: Props) => {
	const userImageLink = useSelector(selectUserImageLink);
	const opacity = useSelector(selectOpacity)
	const bgColor = useSelector(selectBgColor)
	const fgColor = useSelector(selectFgColor)
	const size = useSelector(selectSize)
	const level = useSelector(selectLevel)
	const imageSize = useSelector(selectImageSize)
	const qrExcavate = useSelector(selectQrExcavate)
	const minMaxImageQRSize = useSelector(selectMinMaxImageQRSize)
	const marginSize = 4;
	const imageSettings = {
		src: userImageLink,
			height: size / (minMaxImageQRSize.max - imageSize + minMaxImageQRSize.min),
			width: size / (minMaxImageQRSize.max - imageSize + minMaxImageQRSize.min),
		excavate: qrExcavate,
		opacity: opacity,
		crossOrigin: 'anonymous' as CrossOrigin,
	};

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);

	const { t } = useTranslation();

	const handleDownloadPNG = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const image = canvas.toDataURL('image/png');
			const linkElement = document.createElement('a');
			linkElement.href = image;
			linkElement.download = 'qr-code.png';
			linkElement.click();
			toast.success('QR-код PNG готов к скачиванию!', toastConfig);
		}
	};
	const handleDownloadSVG = () => {
		const svgElement = svgRef.current;
		if (svgElement) {
			const svgString = svgElement.outerHTML;
			const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
			const linkElement = document.createElement('a');
			linkElement.href = dataUri;
			linkElement.download = 'qr-code.svg';
			linkElement.click();
			toast.success('QR-код SVG готов к скачиванию!', toastConfig);
		}
	};
	const handleShareQR = async () => {
		const canvas = canvasRef.current;

		if (!canvas) return;

		const image = canvas.toDataURL('image/png');

		if (navigator.share) {
			try {
				await navigator.share({
					title: 'QR Code',
					text: 'Поделитесь этим QR-кодом',
					files: [
						new File([await fetch(image).then(res => res.blob())], 'qr-code.png', {
							type: 'image/png',
						}),
					],
				});
				toast.success('QR-код готов к отправке!', toastConfig);
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
				console.error(`Ошибка при попытке поделиться QR-кодом: ${message}`, toastConfig);
			}
		} else {
			toast.info('Функция "Поделиться" не поддерживается в вашем браузере.', toastConfig);
		}
	};

	return (
		<div className={s.container}>
			<div className={s.qrsBox}>
				<figure className={s.qrBoxPNG}>
					<QRCodeCanvas
						value={userLink}
						size={size}
						fgColor={fgColor}
						bgColor={bgColor}
						level={level}
						marginSize={marginSize}
						imageSettings={imageSettings}
						ref={canvasRef}
					/>
				</figure>

				<div className={s.qrSVGContainer}>
					<figure className={s.qrBoxSVG} style={{width: `${size}px`, height: `${size}px`}}>
						<QRCodeSVG
							value={userLink}
							size={size}
							fgColor={fgColor}
							bgColor={bgColor}
							level={level}
							marginSize={marginSize}
							imageSettings={imageSettings}
							ref={svgRef}
						/>
					</figure>
				</div>

			</div>

			<div className={s.buttonBox}>
				<Button title={t('buttonTitleDownLoadPNG')} onClickCB={handleDownloadPNG}/>
				<Button title={t('buttonTitleDownLoadSVG')} onClickCB={handleDownloadSVG}/>
				<Button title={t('buttonTitleShareQR')} onClickCB={handleShareQR}/>
			</div>
		</div>
	);
};


