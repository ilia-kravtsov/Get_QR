import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import {toast} from 'react-toastify';
import s from './QR.module.scss';
import {toastConfig} from "../../../utils/constants.ts";
import {FC, useRef} from "react";
import {TQualityQRLevel} from "../common/types.ts";
import {Button} from "../common/Button/Button.tsx";

type ImageSettings = {
	src: string;
	height: number;
	width: number;
	excavate: boolean;
	x?: number;
	y?: number;
	opacity?: number;
	crossOrigin?: 'anonymous' | 'use-credentials' | '' | undefined;
};

type QRProps = {
	value: string | string[];
	size?: number;
	level?: TQualityQRLevel;
	bgColor?: string;
	fgColor?: string;
	marginSize?: number;
	title?: string;
	imageSettings?: ImageSettings;
};

export const QR: FC<QRProps> = ({
																 value,
																 size = 256,
																 level = 'H',
																 bgColor = '#ffffff',
																 fgColor = '#000000',
																 marginSize = 4,
																 imageSettings
															 }) => {

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
				toast.success('QR-код готов к отправке!');
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
				toast.error(`Ошибка при попытке поделиться QR-кодом: ${message}`, toastConfig);
			}
		} else {
			toast.info('Функция "Поделиться" не поддерживается в вашем браузере.', toastConfig);
		}
	};
	console.log('QR')
	return (
		<div className={s.container}>
			<div className={s.qrsBox}>
				<figure className={s.qrBoxPNG}>
					<QRCodeCanvas
						value={value}
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
							value={value}
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


