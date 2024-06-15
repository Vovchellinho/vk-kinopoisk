import { NavLink } from "react-router-dom";
import styles from "./style.module.scss";
import ThemeSwitcher from "@components/ThemeSwitcher";

const Navbar = () => {
	return (
		<nav className={styles.container}>
			<div>
				<ul className={styles.links}>
					<li><NavLink to={'/'} className={({isActive}) => isActive ? styles.active : ""}>Главная</NavLink></li>
					<li><NavLink to={'/favorites'} className={({isActive}) => isActive ? styles.active : ""}>Избранное</NavLink></li>
				</ul>
				<ThemeSwitcher />
			</div>
		</nav>
	);
};

export default Navbar;