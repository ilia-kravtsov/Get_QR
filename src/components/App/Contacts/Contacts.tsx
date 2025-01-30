import s from './Contacts.module.scss'
import telegramIconWhite from '../../../assets/images/telegram_white.svg'
import telegramIconBlack from '../../../assets/images/telegram_black.svg'
import { useTheme } from '../Theme/ThemeProvider.tsx'
import { useTranslation } from '../../../utils/customHooks.ts'

export const Contacts = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const telegramIcon = theme === 'dark' ? telegramIconBlack : telegramIconWhite
  return (
    <div className={s.container}>
      <a className={s.link} href="https://t.me/kravtsov_ilia" target="_blank" rel="noopener noreferrer">
        {t('titleContacts')}
        <img className={s.telegramIcon} src={telegramIcon} alt="telegram logo" />
      </a>
    </div>
  )
}
