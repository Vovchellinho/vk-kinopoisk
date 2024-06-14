import {
	useEffect,
	useState
} from "react";
import API from "@API/index";
import type { TMovie } from "@API/types";
import Spinner from "@UI/Spinner";
import Pagination from "@UI/Pagination";
import FilmList from "@components/FilmList";

const Home = () => {
	const [films, setFilms] = useState<TMovie[]>([]);
	const [pageInfo, setPageInfo] = useState({
		max: 0,
		current: 0
	});
	const [isWait, setIsWait] = useState(false);

	const getData = (page?: number) => {
		API.get({
			endpoint: 'movie',
			getParams: `?page=${page ?? 1}`,
			success: ({data}) => {
				setFilms(data?.docs ?? []);
				if (data?.pages && data.page) {
					setPageInfo({
						max: data.pages - 1,
						current: data.page
					})
				}
			},
			error: (e) => {
			},
			complete: () => {
				setIsWait(false)
			}
		})
	}

	const getDataByPage = (page: number) => {
		if (page !== pageInfo.current) {
			getData(page)
		}
	}

	useEffect(() => {
		setIsWait(true);
		getData();
	}, []);

	return (
		<section>
			{ isWait ? 
				<Spinner />
				:
				<>
					<FilmList films={films} />
					<Pagination max={pageInfo.max} current={pageInfo.current} onChange={getDataByPage} />
				</>

			}
		</section>
	);
};

export default Home;