import {
	HTMLProps,
	useState
} from "react";
import styles from "./style.module.scss";
import Spinner from "@UI/Spinner";

interface IImageProps extends HTMLProps<HTMLImageElement> {};

const Image = ({...props}: IImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const handleLoaded = () => {
		setIsLoaded(true);
	}

	return (
		<div className={styles.container}>
			{ !isLoaded && <Spinner /> }
			<img alt={props.alt} {...props} onLoad={handleLoaded} style={{ display: isLoaded ? 'block' : 'none' }} />
		</div>
	);
};

export default Image;