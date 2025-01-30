import s from './BriefHistoricalInformation.module.scss'
import { useTranslation } from '../../../utils/customHooks.ts'

export const BriefHistory = () => {
  const { t } = useTranslation()
  return (
    <div className={s.container}>
      <h3 className={s.header}>{t('titleBriefHistory')}</h3>
      <p className={s.text}>{t('paragraphHistoryFirst')}</p>
      <p className={s.text}>{t('paragraphHistorySecond')}</p>
      <p className={s.text}>{t('paragraphHistoryThird')}</p>
    </div>
  )
}
