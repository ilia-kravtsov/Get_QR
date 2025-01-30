import { useTheme } from './ThemeProvider'
import { FC } from 'react'
import s from './ThemeToggle.module.scss'

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={s.toggleContainer}>
      <input type="checkbox" id="toggle" className={s.toggleCheckbox} checked={!isDark} onChange={toggleTheme} />
      <label htmlFor="toggle" className={s.toggleLabel}>
        <svg className={`${s.icon} ${s.sun}`} viewBox="0 0 24 24">
          <path d="M12 18a6 6 0 110-12 6 6 0 010 12zM12 0v3M12 21v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M0 12h3M21 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"></path>
        </svg>
        <svg className={`${s.icon} ${s.moon}`} viewBox="0 0 24 24">
          <path d="M21.75 14.5A9.003 9.003 0 019.5 2.25 9 9 0 002 14.5a9 9 0 0016 4.25A8.97 8.97 0 0121.75 14.5z"></path>
        </svg>
      </label>
    </div>
  )
}

export default ThemeToggle
