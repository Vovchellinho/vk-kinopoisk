import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className={styles.container}>
			<ul className={styles.links}>
				<li><NavLink to={'/'}>Главная</NavLink></li>
				<li><NavLink to={'/favorites'}>Избранное</NavLink></li>
			</ul>
		</nav>
	);
};

export default Navbar;