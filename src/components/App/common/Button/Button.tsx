import s from './Button.module.scss'

type Props = {
	title: string
	onClickCB: () => void
	size?: boolean
}

export const Button = ({title, onClickCB, size}: Props) => {
	const buttonStyles = size ? `${s.button} ${s.size}` : s.button
	return <button className={buttonStyles} onClick={onClickCB}>{title}</button>
};

