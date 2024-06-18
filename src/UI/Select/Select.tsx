import {
	useState,
	useEffect
} from "react";
import styles from "./style.module.scss";
import Input from "@UI/Input";
import Spinner from "@UI/Spinner";

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
			{ options ? <>
				{options.map((option, index) => (
					<label key={option + '-' + index}>
						<Input
							type="checkbox"
							value={options.at(index)}
							checked={selectedOptions.includes(option)}
							onChange={handleCheckboxChange}
						/>
						<span className={styles.titleOption}>{option}</span>
					</label>
				))}
			</> : <Spinner/>}
    	</div>
	);
};

export default Select;