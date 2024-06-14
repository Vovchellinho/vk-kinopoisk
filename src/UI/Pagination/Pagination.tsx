import {
	MouseEvent,
	useEffect,
	useState
} from "react";

interface IPaginationProps {
	current: number;
	max: number;
	onChange: (page: number) => void;
}

const Pagination = ({current, max}: IPaginationProps) => {
	const [pages, setPages] = useState<number[]>([]);

	const handleChangePage = (event: MouseEvent<HTMLLIElement>) => {
		// console.log(event.target)
		console.log(event)
	}

	console.log("draw")

	useEffect(() => {
		const pageBlocks = [];
		for(let i = 1; i < max + 1; i++) {
			pageBlocks.push(i);
		}
		setPages(pageBlocks);
	}, [max]);

	return (
		<ul>
			{ pages.map((page) => <li key={page} value={page} onClick={handleChangePage}>
				{page}
			</li>)}
			
		</ul>
	);
};

export default Pagination;