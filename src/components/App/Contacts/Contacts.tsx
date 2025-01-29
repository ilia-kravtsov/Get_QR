import s from "./Contacts.module.scss";
import telegramIconWhite from '../../../assets/images/telegram_white.svg'
import telegramIconBlack from '../../../assets/images/telegram_black.svg'
import {useTheme} from "../Theme/ThemeProvider.tsx";
import ThemeToggle from "../Theme/ThemeToggle.tsx";

export const Contacts = () => {
	const { theme } = useTheme();
	const telegramIcon = theme === "dark" ? telegramIconBlack : telegramIconWhite;
	return (
		<div className={s.container}>
				<ThemeToggle/>
			<a className={s.link} href="https://t.me/kravtsov_ilia" target="_blank" rel="noopener noreferrer">
				Телеграм автора
				<img className={s.telegramIcon} src={telegramIcon} alt="telegram logo"/>
			</a>
		</div>
	);
};

