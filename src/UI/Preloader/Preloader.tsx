import Spinner from "@UI/Spinner";
import { ReactNode } from "react";
import styles from "./style.module.scss";

interface IPreloaderProps {
	children: ReactNode;
	wait: boolean;
}

const Preloader = ({children, wait}: IPreloaderProps) => {
	return (
		<div className={styles.container}>
			{ wait && <div className={styles.blur}><div className={styles.spinner}><Spinner /></div></div>}
			{children}
		</div>
	);
};

export default Preloader;