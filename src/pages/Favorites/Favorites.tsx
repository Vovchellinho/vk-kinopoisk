import { observer } from "mobx-react-lite";
import favoritesStore from "@store/favorites-store";
import styles from "./style.module.scss";
import FilmCard from "@components/FilmCard";

const Favorites = observer(() => {
	return (
		<section className={styles.container}>
			{favoritesStore.favorites.length === 0 ? <p>
				Пока здесь пусто! Добавьте фильмы в избранное для быстрого доступа!
			</p> :
				<ul>
					{favoritesStore.favorites.map((movie) => <li key={`favorite-film-${movie.id}`}>
						<FilmCard {...movie} />
					</li>)}
				</ul>
			}
		</section>
	);
});

export default Favorites;