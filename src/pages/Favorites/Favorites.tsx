import { observer } from "mobx-react-lite";
import favoritesStore from "@store/favorites-store";
import styles from "./style.module.scss";
import FilmList from "@components/FilmList";

const Favorites = observer(() => {
	return (
		<section className={styles.container}>
			{favoritesStore.favorites.length === 0 ? <p>
				Пока здесь пусто! Добавьте фильмы в избранное для быстрого доступа!
			</p> :
				<FilmList films={favoritesStore.favorites} />
			}
		</section>
	);
});

export default Favorites;