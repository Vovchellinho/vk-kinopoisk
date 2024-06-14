import {
	useEffect,
	useState
} from "react";
import API from "../../API";
import type { TMovie } from "../../API/types";
import Spinner from "../../UI/Spinner/Spinner";
import Pagination from "../../UI/Pagination";

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
						max: data.pages,
						current: data.page
					})
				}
			},
			error: (e) => {
				console.log(e)
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
		<div>
			Home
			{ isWait ? 
				<Spinner />
				:
				<>
					<ul>
						{films.map((film) => <li key={film.id}>
							<span>{film.name}</span>
						</li>)}
					</ul>
					<Pagination max={pageInfo.max} current={pageInfo.current} onChange={getDataByPage} />
				</>

			}
		</div>
	);
};

export default Home;