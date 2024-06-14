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
import Header from "@components/Header";
import Home from "@pages/Home";
import Favorites from "@pages/Favorites";

interface IThemeContextProps {
	theme: TTheme,
	toggleTheme: (theme: TTheme) => void
}

export const ThemeContext = createContext<IThemeContextProps>({
	theme: "dark",
	toggleTheme: () => {}
});

const App = () => {
	const [theme, setTheme] = useState<TTheme>("dark");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<div className={styles.app}>
			<ThemeContext.Provider value={{theme, toggleTheme: setTheme}}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/favorites' element={<Favorites/>} />
					<Route path='/film/:id' element={<Favorites/>} />
				</Routes>
			</BrowserRouter>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
