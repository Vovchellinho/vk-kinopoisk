import type {
	TDataResult,
	TGetParams,
	TMapDataEndpoint
} from "./types";
import { MapEndpoint } from "./types";

class API {
	private host = process.env.REACT_APP_API_HOST ?? '';
	private token = process.env.REACT_APP_API_TOKEN ?? '';
	private cacheGet: Map<string, unknown> = new Map();

	constructor() {
		this.cacheGet = new Map();
	}

	public clearCache () {
		this.cacheGet.clear();
	}

	public async get<K extends keyof TMapDataEndpoint>({headers, endpoint, getParams = '', success, error, complete, cache = true}: TGetParams<K>) {
		let result: TDataResult<TMapDataEndpoint[K]> = {
			data: null,
			isError: false,
			error: null
		};
		const cacheData = this.cacheGet.get(endpoint + getParams) as TMapDataEndpoint[K];
		if (cache && cacheData) {
				result.data = cacheData;
				success(result);
		} else {
			try {
				const response = await fetch(this.host + MapEndpoint[endpoint] + getParams, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
						'X-API-KEY': this.token ?? '',
						...headers
					},
				});
				if (response.ok) {
					const dataJson = await response.json();
					result.data = dataJson;
					success(result);
					if (cache) {
						this.cacheGet.set(endpoint + getParams, dataJson);
					}
				} else {
					if (response.status === 404) throw new Error('404, Not found');
					if (response.status === 500) throw new Error('500, internal server error');
					throw new Error(response.statusText);
				}
			} catch (err: unknown) {
				result.isError = true;
				result.error = (err as Error).message;
				error(result);
			}
		}
		
		if (typeof complete === 'function') {
			complete();
		}
	}

	// public async post({headers, endpoint, data, success, error, complete, cache = true}: TPostParams) {
	// 	let result: TDataResult = {
	// 		data: null,
	// 		isError: false,
	// 		error: null
	// 	};
	// 	const cacheKey = this.generateCacheKey(endpoint, data);
	// 	const cacheData = this.cachePost.get(cacheKey);
	// 	if (cache && cacheData) {
	// 			result.data = this.cachePost.get(cacheKey);
	// 			success(result);
	// 	} else {
	// 		try {
	// 			const response = await fetch(this.host + endpoint, {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json;charset=utf-8',
	// 					'X-API-KEY': this.token ?? '',
	// 					...headers
	// 				},
	// 				body: JSON.stringify(data)
	// 			});
	// 			if (response.ok) {
	// 				const dataJson = await response.json();
	// 				result.data = dataJson;
	// 				success(result);
	// 				if (cache) {
	// 					this.cachePost.set(cacheKey, dataJson);
	// 				}
	// 			} else {
	// 				if (response.status === 404) throw new Error('404, Not found');
	// 				if (response.status === 500) throw new Error('500, internal server error');
	// 				throw new Error(response.statusText);
	// 			}
	// 		} catch (err: unknown) {
	// 			result.isError = true;
	// 			result.error = (err as Error).message;
	// 			error(result);
	// 		}
	// 	}
		
	// 	if (typeof complete === 'function') {
	// 		complete();
	// 	}
	// }

	// private generateCacheKey(url: string, data: TPostData) {
	// 	let hashKeys: string[] = [];

	// 	for (const key of Object.keys(data)) {
	// 		if (Object.hasOwn(data, key)) {
	// 			hashKeys.push(`${key}=${JSON.stringify(data[key])}`);
	// 		}
	// 	}

	// 	const sortedParams = hashKeys.sort().join('&');
	// 	const cacheKey = url + '?&' + sortedParams;
			
	// 	return cacheKey;
	// }
};

export default API;
