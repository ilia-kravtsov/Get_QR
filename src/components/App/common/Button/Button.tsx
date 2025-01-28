import s from './Button.module.scss'

type Props = {
	title: string
	onClickCB: () => void
}

export const Button = ({title, onClickCB}: Props) => {
	console.log('Button')
	return <button className={s.button} onClick={onClickCB}>{title}</button>
};

