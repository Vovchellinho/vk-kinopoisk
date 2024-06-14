import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Film = () => {
	const navigation = useParams();

	useEffect(() => {
		console.log(navigation);
	}, [])
	return (
		<div>
			
		</div>
	);
};

export default Film;