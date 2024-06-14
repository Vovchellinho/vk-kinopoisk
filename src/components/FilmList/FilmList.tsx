import type { TMovie } from "@API/types";
import FilmCard from "@components/FilmCard";
import styles from "./style.module.scss";

interface IFilmListProps {
	films: TMovie[];
}

const FilmList = ({films}: IFilmListProps) => {
	return (
		<ul className={styles.container}>
			{films.map((film) => <li key={film.id}>
				<FilmCard {...film} />
			</li>)}
		</ul>
	);
};

export default FilmList;