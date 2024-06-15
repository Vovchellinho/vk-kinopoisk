import Navbar from "@components/Navbar";
import styles from "./style.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<Navbar />
		</header>
	);
};

export default Header;