import {
	type ChangeEvent,
	useState,
	useEffect,
	useRef
} from "react";
import styles from "./style.module.scss";
import Input from "@UI/Input";

export type TRange = {
	min: number;
	max: number;
};

interface IRangeInputProps extends TRange {
	onChange: (result: TRange) => void;
	name?: string;
	defaultMinValue?: number;
	defaultMaxValue?: number;
};

const RangeInput = ({min, max, onChange, name = '', defaultMinValue, defaultMaxValue}: IRangeInputProps) => {
	const [minimum, setMinimum] = useState(defaultMinValue ?? min);
	const [maximum, setMaximum] = useState(defaultMaxValue ?? max);
	const minimumInputRef = useRef<HTMLInputElement>(null);
	const maximumInputRef = useRef<HTMLInputElement>(null);

	const handleChangeMinimum = (e: ChangeEvent<HTMLInputElement>) => {
		setMinimum(Number(e.target.value));
	};

	const handleChangeMaximum = (e: ChangeEvent<HTMLInputElement>) => {
		setMaximum(Number(e.target.value));
	};

	useEffect(() => {
		onChange({
			max: maximum,
			min: minimum
		});
	}, [maximum, minimum, onChange]);

	useEffect(() => {
		const minimumInput = minimumInputRef.current;
		const maximumInput = maximumInputRef.current;

		const blurMin = () => {
			if (maximumInput && minimumInput) {
				const maxValue = Number(maximumInput.value);
				const minValue = Number(minimumInput.value);

				if ((minValue < min) || (minValue > max)) {
					minimumInput.value = String(min);
				} else if (minValue > maxValue) {
					minimumInput.value = String(maxValue);
				}
			}
		}

		const blurMax = () => {
			if (maximumInput && minimumInput) {
				const maxValue = Number(maximumInput.value);
				const minValue = Number(minimumInput.value);

				if ((maxValue < min) || (maxValue > max)) {
					maximumInput.value = String(max);
				} else if (maxValue < minValue) {
					maximumInput.value = String(minValue);
				}
			}
		}

		if (maximumInput) {
			maximumInput.addEventListener('blur', blurMax);
		}
		if (minimumInput) {
			minimumInput.addEventListener('blur', blurMin);
		}

		return () => {
			if (maximumInput) {
				maximumInput.removeEventListener('blur', blurMax);
			}
			if (minimumInput) {
				minimumInput.removeEventListener('blur', blurMin);
			}
		};

	}, [max, min]);

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{name && <span>{name}</span>}
				<div>
					<Input value={minimum} onChange={handleChangeMinimum} type='number' min={min} max={max} ref={minimumInputRef} />
					<span>-</span>
					<Input value={maximum} onChange={handleChangeMaximum} type='number' min={min} max={max} ref={maximumInputRef} />
				</div>
			</label>
		</div>
	);
};

export default RangeInput;