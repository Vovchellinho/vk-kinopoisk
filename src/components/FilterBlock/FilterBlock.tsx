import Genres from "./Genres";
import RangeInput from "@components/RangeInput";
import type { TRange } from "@components/RangeInput/RangeInput";
import {
	useState,
	useRef,
	type FormEvent
} from "react";
import styles from "./style.module.scss";
import Dropdown from "@UI/Dropdown";
import type { IDropdownRef } from "@UI/Dropdown/Dropdown";
import Button from "@UI/Button";

interface IFilterBlockProps {
	onSearch: (query: string) => void;
}

const FilterBlock = ({onSearch}: IFilterBlockProps) => {
	const dropdownRef = useRef<IDropdownRef>(null);
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

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const yearString = `year=${yearRange?.min}-${yearRange?.max}`;
		const genresString = getGenresQuery();
		const ratingString = `rating.imdb=${ratingRange?.min}-${ratingRange?.max}`;
		const query = `&selectFields=&${[yearString, ratingString].join('&') + (genresString ? '&' + genresString : '')}`
		
		if (dropdownRef.current) {
			dropdownRef.current.hide()
		}
		onSearch(query);
	};

	return (
		<Dropdown title={'Фильтры'} ref={dropdownRef}>
			<form className={styles.container} onSubmit={onSubmit}>
				<Genres onChange={setGenres} />
				<div className={styles.rangesBlock}>
					<RangeInput min={1990} max={2025} onChange={setYearRange} name={'Год премьеры'}/>
					<RangeInput min={0} max={10} onChange={setRatingRange} name={'Рейтинг'}/>
				</div>
				<Button value="Найти" type='submit' />
			</form>
		</Dropdown>
	);
};

export default FilterBlock;