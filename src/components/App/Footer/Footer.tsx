import s from './Footer.module.scss'
import { useTranslation } from '../../../utils/customHooks.ts'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className={s.container}>
      <p className={s.text}>© 2025</p>
      <p>{t('companyName')}</p>
    </footer>
  )
}
