import type { EpisodeDataType, TimingsDataType } from '$lib/types/CalculateTimingTypes';
import type { DisplayDataType } from '$lib/types/DisplayDataTypes';

export const generateDisplayData = (episodeData: EpisodeDataType, timingsData: TimingsDataType) => {
	const episodeArray: EpisodeDataType = episodeData;
	const timingsArray: TimingsDataType = timingsData;

	// Create a new object to store the data to be displayed
	const newData: DisplayDataType | ArrayLike<DisplayDataType> | undefined = {
		id: episodeArray.episode.id,
		status: episodeArray.episode.status,
		title: episodeArray.episode.title,
		parts: {}
	};

	// Loop through the parts of the episode
	for (const key in episodeArray.part) {
		const currentPart = episodeArray.part[key];
		const id = currentPart.id;
		const title = currentPart.title;
		const partTimings = timingsArray.part[key];
		const items = {};

		// Loop through the items in the part
		for (const itemKey of currentPart.items) {
			const itemID = itemKey.toString();
			const itemTitle = episodeArray.item[itemID].title;
			const itemTimings = timingsArray.item[itemID];

			items[itemID] = {
				id: itemID,
				title: itemTitle,
				timings: itemTimings
			};
		}

		newData.parts[id] = {
			id: id,
			title: title,
			timings: partTimings,
			items: items
		};
	}
	return newData;
};
