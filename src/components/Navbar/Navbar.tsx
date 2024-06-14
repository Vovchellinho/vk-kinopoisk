import { NavLink } from "react-router-dom";
import styles from "./style.module.scss";

const Navbar = () => {
	return (
		<nav className={styles.container}>
			<ul className={styles.links}>
				<li><NavLink to={'/'} className={({isActive}) => isActive ? styles.active : ""}>Главная</NavLink></li>
				<li><NavLink to={'/favorites'} className={({isActive}) => isActive ? styles.active : ""}>Избранное</NavLink></li>
			</ul>
		</nav>
	);
};

export default Navbar;