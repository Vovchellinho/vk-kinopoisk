import {
	type InputHTMLAttributes,
	forwardRef
} from "react";
import styles from "./style.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {};

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
	return (
		<input className={styles.container} {...props} ref={ref}></input>
	);
});

export default Input;