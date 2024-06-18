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

	public async get<K extends keyof TMapDataEndpoint>({headers, endpoint, version = 'v1.4', getParams = '', success, error, complete, cache = true}: TGetParams<K>) {
		let result: TDataResult<TMapDataEndpoint[K]> = {
			data: null,
			isError: false,
			error: null
		};
		const cacheData = this.cacheGet.get(version + '/' + endpoint + getParams) as TMapDataEndpoint[K];
		if (cache && cacheData) {
				result.data = cacheData;
				success(result);
		} else {
			try {
				const response = await fetch(this.host + version + '/' + MapEndpoint[endpoint] + getParams, {
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
						this.cacheGet.set(version + '/' + endpoint + getParams, dataJson);
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
};

export default API;
