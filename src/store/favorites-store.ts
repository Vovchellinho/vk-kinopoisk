import { makeAutoObservable } from "mobx";
import type { TMovie } from "@API/types";

class FavoritesStore {
	favorites: TMovie[] = [];

	constructor() {
		makeAutoObservable(this);
		this.load();
	}

	add(movie: TMovie) {
		this.favorites.push(movie);
		this.update();
	}

	remove(movie: TMovie) {
		const temp = [...this.favorites].filter(({id}) => movie.id !== id);
		this.favorites = temp;
		this.update();
	}

	private load() {
		const oldFavorites = localStorage.getItem('favorites');
		if (oldFavorites) {
			this.favorites = JSON.parse(oldFavorites);
		}
	}

	private update() {
		localStorage.setItem('favorites', JSON.stringify(this.favorites));
	}
}
const favoritesStore = new FavoritesStore();
export default favoritesStore;