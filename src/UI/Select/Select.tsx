import {
	useState,
	useEffect
} from "react";
import styles from "./style.module.scss";

interface ISelectProps {
	options: string[];
	onChange: (values: string[]) => void;
}

const Select = ({options, onChange}: ISelectProps) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const newSelectedOptions = event.target.checked	? [...selectedOptions, value] : selectedOptions.filter(option => option !== value);
		setSelectedOptions(newSelectedOptions);
	};

	useEffect(() => {
		onChange(selectedOptions);
	}, [selectedOptions, onChange]);

	return (
		<div className={styles.container}>
			{options.map((option, index) => (
				 <label>
					<input
						type="checkbox"
						value={options.at(index)}
						checked={selectedOptions.includes(option)}
						onChange={handleCheckboxChange}
					/>
				 	{option}
			   </label>
			))}
    	</div>
	);
};

export default Select;