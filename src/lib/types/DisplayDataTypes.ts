import type { Timings } from '$lib/types/CalculateTimingTypes';

export interface DisplayDataType {
	id: string;
	status: string;
	title: string;
	parts: { [s: string]: partDataType } | ArrayLike<partDataType>;
}

export interface partDataType {
	id: string;
	title: string;
	timings: Timings;
	items: { [s: string]: itemsDataType } | ArrayLike<itemsDataType>;
}

export interface itemsDataType {
	id: string;
	title: string;
	timings: Timings;
}
