import {
	useEffect,
	useState
} from 'react';
import styles from "./style.module.scss";

interface ISwitchProps<T> {
	left: T;
	right: T;
	initial?: T;
	onChange: (value: T) => void;
}

const Switch = <T,>({left, right, initial=left, onChange}: ISwitchProps<T>) => {
	const [value, setValue] = useState(initial);

	const handleChange = () => {
		setValue((prev) => prev === left ? right : left);
	};

	useEffect(() => {
		onChange(value);
	}, [value, onChange]);

	return (
		<div onClick={handleChange} className={styles.container}>
			<div className={styles.thumb + ' ' +(value === left ? styles.slideToLeft : styles.slideToRight)} />
			<div className={styles.bar}/>
		</div>
	);
};

export default Switch;