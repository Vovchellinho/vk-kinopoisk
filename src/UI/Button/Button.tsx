import {
	type ButtonHTMLAttributes,
	forwardRef
} from "react";
import styles from "./style.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {};

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
	return (
		<button className={styles.container} onClick={props.onClick} {...props} ref={ref}><span>{props.value}</span></button>
	);
});

export default Button;