import {
	useState,
	useRef,
	useEffect,
	type ReactNode,
	type FocusEvent,
	forwardRef,
	useImperativeHandle
} from 'react';
import styles from "./style.module.scss";

interface IDropdownProps {
	title: string;
	children: ReactNode;
}

export interface IDropdownRef {
	hide: () => void;
}

const Dropdown = forwardRef<IDropdownRef, IDropdownProps>(({ title, children }, ref) => {
	const [isOpened, setIsOpened] = useState(false);
	const [height, setHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpened((prev) => !prev);
	};

	const handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (e.nativeEvent.relatedTarget === null) {
			setIsOpened(false);
		}
	}

	const hide = () => {
		setIsOpened(false);
	}

	useEffect(() => {
		if (!contentRef.current) return;
		if (isOpened) {
			setHeight(300);
			contentRef.current.classList.remove(styles.closed);
		} else {
			setHeight(0);
			setTimeout(() => {
				contentRef.current?.classList.add(styles.closed);
			}, 300)
		}
	}, [isOpened]);

	useImperativeHandle(ref, () => ({
		hide
	}));

	return (
		<div className={styles.container} onBlur={handleOnBlur} tabIndex={0}>
			<div className={styles.title} onClick={toggleOpen}>
				{title}
			</div>
			<div style={{maxHeight: `${height}px`}} className={styles.content} ref={contentRef} >
				{children}
			</div>
		</div>
	);
});

export default Dropdown;
