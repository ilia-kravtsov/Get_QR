import s from './Button.module.scss'

type Props = {
	title: string
	onClickCB: () => void
	size?: boolean
	disabled?: boolean
}

export const Button = ({title, onClickCB, size, disabled}: Props) => {
	const buttonStyles = size ? `${s.button} ${s.size}` : s.button
	return <button className={buttonStyles} onClick={onClickCB} disabled={disabled}>{title}</button>
};

