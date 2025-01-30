import s from './Button.module.scss'

interface Props {
  title: string
  onClickCB: () => void
  height?: number
  width?: number
  disabled?: boolean
}

export const Button = ({ title, onClickCB, height, width, disabled }: Props) => {
  const buttonStyles = {
    height: height ? `${height}px` : undefined,
    width: width ? `${width}px` : undefined,
  }
  return (
    <button className={s.button} onClick={onClickCB} style={buttonStyles} disabled={disabled}>
      {title}
    </button>
  )
}
