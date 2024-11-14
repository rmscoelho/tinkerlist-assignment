export interface Episodes {
	id: string;
	status: string;
	title: string;
	timing: Timings;
	part: EpisodeParts[];
}

export interface EpisodeParts {
	episodeId: string;
	title: string;
	timing: Timings;
	items: { [key: string]: PartItems };
}

export interface PartItems {
	id: string;
	title: string;
	timing: Timings;
}

export interface Timings {
	estimatedDuration: string;
	front_time: string;
	end_time: string;
	back_time: string;
}
