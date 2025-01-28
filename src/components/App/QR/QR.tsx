import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import {toast} from 'react-toastify';
import s from './QR.module.scss';
import {toastConfig} from "../../../utils/constants.ts";
import {useRef} from "react";
import {Button} from "../common/Button/Button.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

type Props = {
	link: string
}

export const QR = ({link}: Props) => {

	const opacity = useSelector((state: RootState) => state.qr.opacity)
	const bgColor = useSelector((state: RootState) => state.qr.bgColor)
	const fgColor = useSelector((state: RootState) => state.qr.fgColor)
	const size = useSelector((state: RootState) => state.qr.size)
	const level = useSelector((state: RootState) => state.qr.level)
	const imageSize = useSelector((state: RootState) => state.qr.imageSize)
	const marginSize = 4;
	const imageSettings = {
		src: link,
		height: size/imageSize,
		width: size/imageSize,
		excavate: false,
		opacity: opacity,
		crossOrigin: 'anonymous' as CrossOrigin,
	};

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);

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
				toast.error(`Ошибка при попытке поделиться QR-кодом: ${message}`, toastConfig);
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
						value={link}
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
							value={link}
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
				<Button title={'Скачать в PNG'} onClickCB={handleDownloadPNG}/>
				<Button title={'Скачать в SVG'} onClickCB={handleDownloadSVG}/>
				<Button title={'Поделиться QR-кодом'} onClickCB={handleShareQR}/>
			</div>
		</div>
	);
};


