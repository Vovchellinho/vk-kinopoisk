import API from "@API/index";
import Genres from "./Genres";
import RangeInput from "@components/RangeInput";
import type { TRange } from "@components/RangeInput/RangeInput";
import { useState } from "react";
import styles from "./style.module.scss";
import Dropdown from "@UI/Dropdown";

const FilterBlock = () => {
	const [genres, setGenres] = useState<string[]>([]);
	const [yearRange, setYearRange] = useState<TRange>();
	const [ratingRange, setRatingRange] = useState<TRange>();

	const getGenresQuery = () : string => {
		if (genres.length === 0) {
			return '';
		} else if (genres.length === 1) {
			return `genres.name=${genres.at(0)}`;
		} else {
			return genres.map(genre => 'genres.name=' + genre).join('&');
		}
	}

	const onSubmit = () => {
		const yearString = `year=${yearRange?.min}-${yearRange?.max}`;
		const genresString = getGenresQuery();
		const ratingString = `rating.imdb=${ratingRange?.min}-${ratingRange?.max}`;
		const query = `&selectFields=&${[yearString, ratingString].join('&') + (genresString ? '&' + genresString : '')}`

		API.get({
			endpoint: 'movies',
			getParams: `?page=${1}&limit=50${query}`,
			success: ({data}) => {
				console.log(data)
				// setFilms(data?.docs ?? []);
				// if (data?.pages && data.page) {
				// 	setCurrentPage(data.page);
				// 	setMaxPage(data.pages);
				// }
			},
			error: (e) => {
			},
			complete: () => {
				// setIsWait(false);
				// window.scrollTo({ 
				// 	top: 0, 
				// 	behavior: "smooth" 
				// });
			}
		})
	};

	return (
		<Dropdown title={'Фильтры'}>
			<div className={styles.container}>
				<Genres onChange={setGenres} />
				<div className={styles.rangesBlock}>
					<RangeInput min={1900} defaultMinValue={2012} max={2024} onChange={setYearRange} name={'Год премьеры'}/>
					<RangeInput min={0} max={10} onChange={setRatingRange} name={'Рейтинг'}/>
				</div>
				<div onClick={onSubmit}>
					Найти
				</div>
			</div>
		</Dropdown>
	);
};

export default FilterBlock;