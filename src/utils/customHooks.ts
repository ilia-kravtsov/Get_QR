import { useSelector } from 'react-redux'
import { languageStore } from '../store/language.ts'
import { languageSelect } from '../store/selectors.ts'

export const useTranslation = () => {
  const language = useSelector(languageSelect)

  const t = (key: keyof (typeof languageStore)['en']) => languageStore[language][key]

  return { t, language }
}
