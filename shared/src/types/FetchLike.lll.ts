import { FetchLikeResponse } from './FetchLikeResponse.lll';


export type FetchLike = (
	url: string,
	init?: {
		method?: string;
		headers?: Record<string, string>;
		body?: unknown;
		signal?: unknown;
		credentials?: 'omit' | 'same-origin' | 'include';
	}
) => Promise<FetchLikeResponse>;
