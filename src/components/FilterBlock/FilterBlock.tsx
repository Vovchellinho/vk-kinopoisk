import Genres from "./Genres";
import RangeInput from "@components/RangeInput";
import type { TRange } from "@components/RangeInput/RangeInput";
import { useEffect, useState } from "react";

const FilterBlock = () => {
	const [genresChecked, setGenresChecked] = useState<string[]>([]);
	const [yearRange, setYearRange] = useState<TRange>();
	const [ratingRange, setRatingRange] = useState<TRange>();

	const onSubmit = () => {
		// &year=2020-2024
		// &rating.imdb=7-10
		// &genres.name=+ужасы
		const yearString = `&year=${yearRange?.min}-${yearRange?.max}`;
		const genresString = `&genres.name=${genresChecked.map(genre => '+' + genre)}`;
		const ratingString = `&rating.imdb=${ratingRange?.min}-${ratingRange?.max}`;

		console.log(yearString)
		console.log(ratingString)
		console.log(genresString)
	};

	return (
		<div>
			<Genres onChange={setGenresChecked} />
			<RangeInput min={1900} max={2024} onChange={setYearRange} name={'Год премьеры'}/>
			<RangeInput min={1} max={10} onChange={setRatingRange} name={'Рейтинг'}/>
			<button value={'Найти'} onClick={onSubmit}/>
		</div>
	);
};

export default FilterBlock;