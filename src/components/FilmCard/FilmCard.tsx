import type { TMovie } from "@API/types";
import styles from "./style.module.scss";
import NoImage from "@assets/images/no-image.png";
import { Link } from "react-router-dom";
import Image from "@UI/Image";

const FilmCard = ({id, name, alternativeName, year, poster, rating}: TMovie) => {

	return (
		<Link to={ `/film/${id}`} className={styles.container}>
			<div className={styles.posterContainer}>
				<Image alt={`Постер для фильма ${name ?? alternativeName}`} className={styles.poster + (typeof poster?.previewUrl === 'string' ? '' : (' ' + styles.no_image))} src={poster?.previewUrl ?? NoImage} />
			</div>
			<h2>{name ?? alternativeName}</h2>
			<span>Рейтинг: {rating.imdb === 0 ? 'н/д' : rating.imdb}</span>
			<span>{year}</span>
		</Link>
	);
};

export default FilmCard;