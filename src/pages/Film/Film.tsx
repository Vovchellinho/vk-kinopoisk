import API from "@API/index";
import { TMovie } from "@API/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoImage from "@images/no-image.png";
import styles from "./style.module.scss";
import FavoriteButton from "@components/FavoriteButton";
import Preloader from "@UI/Preloader";

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
		<section>
			{ movie && 
				<Preloader wait={isWait}>
					<div className={styles.container}>
						<div className={styles.posterContainer}>
							<img alt={`Постер для фильма ${movie.name ?? movie.alternativeName}`} className={styles.poster + (typeof movie.poster?.previewUrl === 'string' ? '' : (' ' + styles.no_image))} src={movie.poster?.previewUrl ?? NoImage} />
							<div className={styles.favoriteButton}>
								<FavoriteButton movie={movie} />
							</div>
						</div>
						<h2>Название: {movie.name ?? movie.alternativeName}</h2>
						<span>Рейтинг (imdb): {movie.rating.imdb === 0 ? 'н/д' : movie.rating.imdb}</span>
						<span>Год премьеры: {movie.year}</span>
						<p>{movie.description}</p>
						<p>
							Жанры:  
							{
								movie.genres.map((genre, index) => <span key={`genre+${index}+to-film-${id}`}>
									{' ' + genre.name + (((index + 1) < movie.genres.length) ? ',' : '') }
								</span>)
							}
						</p>
					</div>
				</Preloader>
			}
		</section>
	);
};

export default Film;