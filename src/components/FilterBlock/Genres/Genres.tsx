import Select from "@UI/Select";
import {
	useState,
	useEffect
} from "react";
import API from "@API/index";
import type { TGenre } from "@API/types";

interface IGenresProps {
	onChange: (value: string[]) => void;
};

const Genres = ({onChange}: IGenresProps) => {
	const [genres, setGenres] = useState<TGenre[]>([]);

	const getGenres = () => {
		API.get({
			endpoint: 'genres',
			version: 'v1',
			success: ({data}) => {
				if (data) {
					setGenres(data);
				}
			},
			error: (e) => {
				console.error(e)
			},
			complete: () => {

			}
		})
	};

	useEffect(() => {
		getGenres();
	}, []);

	return (
		<Select options={genres.map(genre => genre.name)} onChange={onChange}/>
	);
};

export default Genres;