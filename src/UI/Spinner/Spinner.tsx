import styles from "./style.module.scss";

const Spinner = () => {
	return(<div className={styles['spinner'] + ' ' + styles['animate']}></div>);
};

export default Spinner;