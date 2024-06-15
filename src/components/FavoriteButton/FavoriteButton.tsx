import type { TMovie } from "@API/types";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "@store/favorites-store";
import styles from "./style.module.scss";

interface IFavoriteButtonProps {
	movie: TMovie;
}

const FavoriteButton = observer(({movie}: IFavoriteButtonProps) => {
	const [isLiked, setIsLiked] = useState(false);

	const handleOnClick = () => {
		if (isLiked) {
			favoritesStore.remove(movie);
			setIsLiked(false)
		} else {
			favoritesStore.add(movie);
			setIsLiked(true);
		}
	};

	useEffect(() => {
		if (favoritesStore.favorites.map((movie) => movie.id).includes(movie.id)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [movie.id]);

	return (
		<div className={styles.container} onClick={handleOnClick}>
			{ isLiked ? <span>
				Удалить из избранного
			</span> : <>
				Добавить в избранное
			</>}
		</div>
	);
});

export default FavoriteButton;