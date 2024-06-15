export type TDataResult<T> = {
	data: T | null;
	error: null | string;
	isError: boolean;
}

export type TQuery<K extends keyof TMapDataEndpoint> = {
	endpoint: K;
	headers?: {};
	getParams?: string;
	cache?: boolean;
	success: (e: TSuccess<K>) => void;
	error: (e: TError<K>) => void;
	complete?: () => void;
}

export type TPostData = {
	[index: string]: any | ((...args: any) => any)
}

export type TSuccess<K extends keyof TMapDataEndpoint> = TDataResult<TMapDataEndpoint[K]> & {};

export type TError<K extends keyof TMapDataEndpoint> = TDataResult<TMapDataEndpoint[K]> & {};

export type TGetParams<K extends keyof TMapDataEndpoint> = TQuery<K>;

export type TMapDataEndpoint = {
	'movies': TMovies;
	'movie': TMovie;
}

export const MapEndpoint = {
	'movies': 'movie',
	'movie': 'movie'
}

export type TWithPaginate = {
	limit: number;
	page: number;
	pages: number;
	total: number;
}

export type TMovies = TWithPaginate & {
	docs: TMovie[];
}

export type TMovie = {
	id: number;
	name: string;
	alternativeName: any;
	enName: any;
	type: string;
	typeNumber: number;
	year: number;
	description: string;
	shortDescription: string;
	status: any;
	rating: TRating;
	votes: TVotes;
	movieLength: number;
	totalSeriesLength: any;
	seriesLength: any;
	ratingMpaa: any;
	ageRating: number;
	poster: TPoster;
	backdrop: TBackdrop;
	genres: TGenre[];
	countries: TCountry[];
	top10: any;
	top250: any;
	isSeries: boolean;
	ticketsOnSale: boolean;
}

export type TRating = {
	kp: number;
	imdb: number;
	filmCritics: number;
	russianFilmCritics: number;
	await: number;
}

export type TVotes = {
	kp: number;
	imdb: number;
	filmCritics: number;
	russianFilmCritics: number;
	await: number;
}

export type TPoster = {
	url: string;
	previewUrl: string;
}

export type TBackdrop = {
	url: string;
	previewUrl: string;
}

export type TGenre = {
	name: string;
}

export type TCountry = {
	name: string;
}