import Switch from "@UI/Switch";
import { TTheme } from "src/types";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import styles from "./style.module.scss";

const ThemeSwitcher = () => {
	const { toggleTheme } = useContext(ThemeContext);

	return (
		<div className={styles.mode}>
			<span>Dark</span>
			<Switch<TTheme> left={"dark"} right={"light"} onChange={toggleTheme} />
			<span>Light</span>
		</div>
	);
};

export default ThemeSwitcher;