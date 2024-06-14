import type { TMovie } from "@API/types";
import styles from "./style.module.scss";
import NoImage from "@assets/images/no-image.png";
import { useNavigate } from "react-router-dom";

const FilmCard = ({id, name, alternativeName, year, poster, rating}: TMovie) => {
	const navigate = useNavigate();

	const handleClickFilm = () => {
		navigate({ pathname: `/film/${id}`});
	};

	return (
		<div className={styles.container} onClick={handleClickFilm}>
			<div className={styles.posterContainer}>
				<img alt={`Постер для фильма ${name ?? alternativeName}`} className={styles.poster + (typeof poster?.previewUrl === 'string' ? '' : (' ' + styles.no_image))} src={poster?.previewUrl ?? NoImage} />
			</div>
			<span>{name ?? alternativeName}</span>
			<span>Рейтинг: {rating.imdb === 0 ? 'н/д' : rating.imdb}</span>
			<span>{year}</span>
		</div>
	);
};

export default FilmCard;