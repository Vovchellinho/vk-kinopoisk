import {
	useEffect,
	useState
} from "react";
import API from "@API/index";
import type { TMovie } from "@API/types";
import Pagination from "@UI/Pagination";
import FilmList from "@components/FilmList";
import styles from "./style.module.scss";
import Preloader from "@UI/Preloader";
import FilterBlock from "@components/FilterBlock";

const Home = () => {
	const [films, setFilms] = useState<TMovie[]>([]);
	const [filterQuery, setFilterQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [isWait, setIsWait] = useState(false);

	const getData = (page?: number) => {
		setIsWait(true);
		API.get({
			endpoint: 'movies',
			getParams: `?page=${page ?? 1}&limit=50${filterQuery}`,
			success: ({data}) => {
				setFilms(data?.docs ?? []);
				if (data?.pages && data.page) {
					setCurrentPage(data.page);
					setMaxPage(data.pages);
				}
			},
			error: (e) => {
				console.error(e)
			},
			complete: () => {
				setIsWait(false);
				window.scrollTo({ 
					top: 0, 
					behavior: "smooth" 
				});
			}
		})
	}

	const handleSearch = (query: string) => {
		setFilterQuery(query);
	}

	useEffect(() => {
		getData(currentPage);
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(1);
		getData(1)
	}, [filterQuery]);

	useEffect(() => {
		getData();
	}, []);

	return (
		<section>
			<div className={styles.container}>
				<FilterBlock onSearch={handleSearch} />
				<Preloader wait={isWait}>
					<FilmList films={films} />
				</Preloader>
				<Pagination max={maxPage} current={currentPage} onChange={setCurrentPage} />
			</div>
		</section>
	);
};

export default Home;