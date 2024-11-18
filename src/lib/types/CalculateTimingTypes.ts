export interface TimingsDataType {
	episode: { on_air_time: number; off_air_time: number };
	part: { [key: string]: Timings };
	item: { [key: string]: Timings };
}

export interface EpisodeDataType {
	episode: EpisodeParts;
	part: { [key: string]: PartItems };
	item: { [key: string]: ItemsType };
}

export interface EpisodeParts {
	id: string;
	status: string;
	title: string;
	parts: PartItems;
}

export interface PartItems {
	id: string;
	title: string;
	items: ItemsType[];
}

export interface ItemsType {
	id: string;
	title: string;
}

export interface Timings {
	estimated_duration: number;
	front_time: number;
	end_time: number;
	back_time: number;
}
