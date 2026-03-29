import { FetchLike } from './FetchLike.lll';
import type { EndpointPath, EndpointMethod } from '..';


export type TypedFetchOptions<Path extends EndpointPath> = {
	baseUrl?: string;
	headers?: Record<string, string>;
	method?: EndpointMethod<Path>;
	signal?: unknown;
	credentials?: 'omit' | 'same-origin' | 'include';
	fetchImpl?: FetchLike;
};
