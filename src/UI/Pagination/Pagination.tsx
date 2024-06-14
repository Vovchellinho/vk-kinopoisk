import {
	MouseEvent,
	useEffect,
	useLayoutEffect,
	useState
} from "react";

interface IPaginationProps {
	current: number;
	max: number;
	onChange: (page: number) => void;
}

const Pagination = ({current, max, onChange}: IPaginationProps) => {
	const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    const generatePages = () => {
      const getPages = () => {
		let pages: (number | string)[] = [];
	
		if (max <= 1) return pages;
	
		if (current <= 4) {
		  for (let i = 1; i <= Math.min(8, max); i++) {
			pages.push(i);
		  }
		  if (max > 8) pages.push('...', max);
		} else if (current > max - 4) {
		  pages.push(1, '...');
		  for (let i = max - 7; i <= max; i++) {
			pages.push(i);
		  }
		} else {
		  pages.push(1, '...');
		  for (let i = current - 3; i <= current + 3; i++) {
			pages.push(i);
		  }
		  pages.push('...', max);
		}

		return pages;
	  };

      setPages(getPages());
    };

    generatePages();
  }, [max, current]);

	const handleChangePage = (event: MouseEvent<HTMLLIElement>) => {
		if ('innerText' in event.target) {
			const value = Number(event.target.innerText)
			onChange(value)
		}
	}
	
	return (
		<ul>
			{/* <button onClick={() => onChange(current - 1)} disabled={current === 1}>
				&lt;
			</button> */}
			{ pages.map((page, index) => <li key={index} value={page} onClick={handleChangePage}>
				{page}
			</li>)}
			{/* <button onClick={() => onChange(current - 1)} disabled={current === 1}>
				&gt;
			</button> */}
		</ul>
	);
};

export default Pagination;