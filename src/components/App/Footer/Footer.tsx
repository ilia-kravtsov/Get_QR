import s from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={s.container}>
			<p className={s.text}>
				© 2025
			</p>
			<p>
				Kravtsov Web Solutions
			</p>
		</footer>
	);
};

