import {
	createContext,
	useState,
	useEffect
} from "react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import styles from "./style.module.scss";
import type { TTheme } from "./types";
import Home from "@pages/Home";
import Favorites from "@pages/Favorites";
import Film from "@pages/Film";
import Layout from "./Layout";

interface IThemeContextProps {
	theme: TTheme,
	toggleTheme: (theme: TTheme) => void
}

export const ThemeContext = createContext<IThemeContextProps>({
	theme: "dark",
	toggleTheme: () => {}
});

const App = () => {
	const [theme, toggleTheme] = useState<TTheme>("dark");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<div className={styles.app}>
			<ThemeContext.Provider value={{theme, toggleTheme}}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home/>} />
						<Route path='favorites' element={<Favorites/>} />
						<Route path='film/:id' element={<Film/>} />
					</Route>
				</Routes>
			</BrowserRouter>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
