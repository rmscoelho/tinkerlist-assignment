import type { CalculateTimingTypes, EpisodeParts } from '$lib/types/calculateTimingTypes';
import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';

export const handleEpisodesData = (episode: object, timings: object) => {
	const timingEpisode = timings.episode;
	const frontTime = timingEpisode.on_air_time;
	const endTime = timingEpisode.off_air_time;
	const duration = timingEpisode.off_air_time - timingEpisode.on_air_time;
	const backTime =
		timingEpisode.off_air_time - (timingEpisode.off_air_time - timingEpisode.on_air_time);
	const episodeTimmings = {
		estimatedDuration: duration,
		front_time: frontTime,
		end_time: endTime,
		back_time: backTime
	};

	const partsArray: Array<EpisodeParts> = handlePartsIteration(episode, timings, episodeTimmings);

	const dataArray: CalculateTimingTypes = {
		id: episode.episode.id,
		status: episode.episode.status,
		title: episode.episode.title,
		timing: {
			estimatedDuration: handleDateConversion(duration),
			front_time: handleDateConversion(frontTime),
			end_time: handleDateConversion(endTime),
			back_time: handleDateConversion(backTime)
		},
		part: partsArray
	};

	// console.log(dataArray);

	return dataArray;
};

export const handlePartsIteration = (episode, timings, episodeTimmings) => {
	const dataArray: Array<EpisodeParts> = [];

	let previousFront = episodeTimmings.front_time;
	let previousEnd = episodeTimmings.end_time;
	let previousBack = episodeTimmings.back_time;
	let previousDuration = episodeTimmings.estimatedDuration;

	for (let i = 0; i < Object.keys(episode.part).length; i++) {
		const partData = episode.part[episode.episode.parts[i]];
		const estimatedPartDuration = timings.part[partData.id].estimated_duration / 1000;

		const frontTime = i === 0 ? previousFront : previousFront + previousDuration;
		const endTime =
			i === 0 ? previousFront + estimatedPartDuration : frontTime + estimatedPartDuration;
		const backtime = previousBack + estimatedPartDuration;

		const partDataArray: EpisodeParts = {
			id: partData.id,
			title: partData.title,
			timing: {
				estimatedDuration: handleDateConversion(estimatedPartDuration),
				front_time: handleDateConversion(frontTime),
				end_time: handleDateConversion(endTime),
				back_time: handleDateConversion(backtime)
			},
			items: handleItemIteration(partData, episode, timings)
		};

		dataArray[i] = partDataArray;
	}

	return dataArray;
};

export const handleItemIteration = (partData: object, episode: object, timings: object) => {
	const itemDataArray = {};
	for (let j = 0; j < Object.keys(partData.items).length; j++) {
		const itemData = episode.item[partData.items[j]];
		const estimatedItemDuration = timings.item[itemData.id].estimated_duration / 1000;

		itemDataArray[j] = {
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

	return itemDataArray;
};
