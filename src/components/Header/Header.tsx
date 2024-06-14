import Navbar from "../Navbar";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from "./style.module.scss";

const Header = () => {
	return (
		<header className={styles.header}>
			<Navbar />
			<ThemeSwitcher />
		</header>
	);
};

export default Header;