
export type FetchLikeResponse = {
	ok: boolean;
	status: number;
	statusText: string;
	headers: {
		get(name: string): string | null;
	};
	json(): Promise<unknown>;
	text(): Promise<string>;
};
