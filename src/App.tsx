import styles from "./style.module.scss";
import {
	createContext,
	useState,
	useEffect
} from "react";
import type { TTheme } from "./types";
import Header from "./components/Header";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

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
				</Routes>
			</BrowserRouter>
			</ThemeContext.Provider>
		</div>
	);
}

export default App;
