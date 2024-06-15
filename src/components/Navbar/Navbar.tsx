import { NavLink } from "react-router-dom";
import styles from "./style.module.scss";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { observer } from "mobx-react-lite";
import favoritesStore from "@store/favorites-store";

const Navbar = observer(() => {
	return (
		<nav className={styles.container}>
			<div>
				<ul className={styles.links}>
					<li><NavLink to={'/'} className={({isActive}) => isActive ? styles.active : ""}>Главная</NavLink></li>
					<li>
						<NavLink to={'/favorites'} className={({isActive}) => isActive ? styles.active : ""}>
							<span>Избранное</span>
							{favoritesStore.favorites.length > 0 && <span className={styles.number}>{favoritesStore.favorites.length > 99 ? '99+' : favoritesStore.favorites.length}</span>}
						</NavLink>
					</li>
				</ul>
				<ThemeSwitcher />
			</div>
		</nav>
	);
});

export default Navbar;