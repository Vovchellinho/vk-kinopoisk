import {
	useState,
	useRef,
	useEffect,
	type ReactNode
} from 'react';
import styles from "./style.module.scss";

interface IDropdownProps {
	title: string;
	children: ReactNode;
}

const Dropdown = ({ title, children }: IDropdownProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const [height, setHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpened((prev) => !prev);
	};

	useEffect(() => {
		if (!contentRef.current) return;
		if (isOpened) {
			setHeight(200);
			contentRef.current.classList.remove(styles.closed);
		} else {
			setHeight(0);
			contentRef.current.classList.add(styles.closed);
		}
	}, [isOpened]);

	return (
		<div className={styles.container}>
			<div className={styles.title} onClick={toggleOpen}>
				{title}
			</div>
			<div style={{maxHeight: `${height}px`}} className={styles.content} ref={contentRef} >
				{children}
			</div>
		</div>
	);
};

export default Dropdown;
