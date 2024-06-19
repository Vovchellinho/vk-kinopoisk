import {
	MouseEvent,
	useEffect,
	useState
} from "react";
import styles from "./style.module.scss";

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

		if (max <= 10) {
			for (let i = 1; i <= max; i++) {
				pages.push(i);
			}
			return pages;
		}
	
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
			pages.push(1);
			if (current - 3 !== 2) {
				pages.push('...');
			}
			for (let i = current - 3; i <= current + 3; i++) {
				pages.push(i);
			}
			if ((Number(pages.at(-1)) + 1) !== max) {
				pages.push('...', max);
			} else {
				pages.push(max);
			}
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
			if (value) {
				onChange(value)
			}
		}
	}

	const handlePrevPage = () => {
		if (current > 1) {
			onChange(current - 1);
		}
	};

	const handleNextPage = () => {
		if (current < max) {
			onChange(current + 1);
		}
	}
	
	return (
		<>
			{pages.length > 0 &&
				<ul className={styles.container}>
					<li onClick={handlePrevPage} className={current === 1 ? styles.disabled : ''}>
						&lt;
					</li>
					{ pages.map((page, index) => <li key={index} className={(page === current ? styles.active : '') + (page === '...' ? (' ' + styles.disabled) : '')} value={page} onClick={handleChangePage}>
						{page}
					</li>)}
					<li onClick={handleNextPage} className={current === max ? styles.disabled : ''}>
						&gt;
					</li>
				</ul>
			}
		</>
	);
};

export default Pagination;