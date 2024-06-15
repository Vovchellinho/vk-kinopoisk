import { observer } from "mobx-react-lite";
import favoritesStore from "@store/favorites-store";
import { useEffect } from "react";
import FilmCard from "@components/FilmCard";

const Favorites = observer(() => {
	return (
		<ul>
			{favoritesStore.favorites.map((movie) => <li key={`favorite-film-${movie.id}`}>
				<FilmCard {...movie} />
			</li>)}
		</ul>
	);
});

export default Favorites;