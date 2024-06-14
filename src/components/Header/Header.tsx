import Navbar from "@components/Navbar";
import ThemeSwitcher from "@components/ThemeSwitcher";
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