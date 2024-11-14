import type { EpisodeParts, Episodes } from '$lib/types/episodes';
import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';

export const handleEpisodesData = (episode: object, timings: object) => {
	const partsArray: Array<EpisodeParts> = handlePartsIteration(episode, timings);
	const frontTime = handleDateConversion(timings.episode.on_air_time);
	const endTime = handleDateConversion(timings.episode.off_air_time);
	const duration = handleDateConversion(timings.episode.off_air_time - timings.episode.on_air_time);
	const backTime = handleDateConversion(
		timings.episode.off_air_time - (timings.episode.off_air_time - timings.episode.on_air_time)
	);

	const dataArray: Episodes = {
		id: episode.episode.id,
		status: episode.episode.status,
		title: episode.episode.title,
		timing: {
			estimatedDuration: duration,
			front_time: frontTime,
			end_time: endTime,
			back_time: backTime
		},
		part: partsArray
	};

	console.log(dataArray);

	return dataArray;
};

export const handlePartsIteration = (episode, timings) => {
	const dataArray: Array<EpisodeParts> = [];

	for (let i = 0; i < Object.keys(episode.part).length; i++) {
		const partData = episode.part[episode.episode.parts[i]];
		const estimatedPartDuration = timings.part[partData.id].estimated_duration / 1000;

		const partDataArray: EpisodeParts = {
			episodeId: partData.id,
			title: partData.title,
			timing: {
				estimatedDuration: handleDateConversion(estimatedPartDuration),
				front_time: '',
				end_time: '',
				back_time: ''
			},
			items: {}
		};

		for (let j = 0; j < Object.keys(partData.items).length; j++) {
			const itemData = episode.item[partData.items[j]];
			const estimatedItemDuration = timings.item[itemData.id].estimated_duration / 1000;

			partDataArray.items[j] = {
				id: itemData.id,
				title: itemData.title,
				timing: {
					estimatedDuration: handleDateConversion(estimatedItemDuration),
					front_time: '',
					end_time: '',
					back_time: ''
				}
			};
		}

		dataArray[i] = partDataArray;
	}

	return dataArray;
};

export const handleItemIteration = (episode: object, timings: object) => {};
