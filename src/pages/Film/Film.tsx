import API from "@API/index";
import { TMovie } from "@API/types";
import Spinner from "@UI/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoImage from "@images/no-image.png";
import styles from "./style.module.scss";
import FavoriteButton from "@components/FavoriteButton";

const Film = () => {
	const [movie, setMovie] = useState<TMovie>();
	const [isWait, setIsWait] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setIsWait(true);
			API.get({
				endpoint: 'movie',
				getParams: `/${id}`,
				success: ({data}) => {
					if (data) {
						setMovie(data)
					}
				},
				error: (e) => {
					console.log(e)
				},
				complete: () => {
					setIsWait(false);
				}
			})
		}
	}, [id])
	return (
		<div>
			{isWait ? <Spinner/> : <>
				{ movie && <>
					<div className={styles.posterContainer}>
						<img alt={`Постер для фильма ${movie.name ?? movie.alternativeName}`} className={styles.poster + (typeof movie.poster?.previewUrl === 'string' ? '' : (' ' + styles.no_image))} src={movie.poster?.previewUrl ?? NoImage} />
					</div>
					<span>{movie.name ?? movie.alternativeName}</span>
					<FavoriteButton movie={movie} />
					<span>Рейтинг: {movie.rating.imdb === 0 ? 'н/д' : movie.rating.imdb}</span>
					<span>{movie.year}</span>
					<p>{movie.description}</p>
					{
						movie.genres.map((genre, index) => <span key={`genre+${index}+to-film-${id}`}>
							{genre.name}
						</span>)
					}
				</>
				}
			</>}
		</div>
	);
};

export default Film;