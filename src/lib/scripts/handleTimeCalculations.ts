import type { EpisodeDataType, TimingsDataType } from '$lib/types/calculateTimingTypes';

export const handleDateConversion = (date: number): string => {
	const dtFormat = new Intl.DateTimeFormat('en-GB', {
		timeStyle: 'medium',
		timeZone: 'UTC'
	});

	return dtFormat.format(new Date(date * 1000));
};

export const calculateTimmings = (episodeData: EpisodeDataType, timingsData: TimingsDataType) => {
	const timingsArray: TimingsDataType = timingsData;
	const episodeArray: EpisodeDataType = episodeData;

	const onAirTime = timingsArray.episode.on_air_time;
	const offAirTime = timingsArray.episode.off_air_time;
	const partsList = episodeData.episode.parts;

	// Create variables for the previous front, end, duration and back times
	const previousTime = {
		front_time: onAirTime,
		end_time: offAirTime,
		duration: offAirTime - onAirTime,
		back_time: offAirTime - (offAirTime - onAirTime)
	};

	// Loop through the parts of the episode
	for (let i = 0; i < Object.keys(partsList).length; i++) {
		// Get the estimated duration, front time, end time and back time for the current part
		const estDuration = timingsArray.part[partsList[i]].estimated_duration; //check
		const frontTime = i === 0 ? previousTime.front_time : previousTime.end_time; //check
		const endTime = endTimeCalculation(previousTime.front_time, estDuration / 1000); //check
		const backTime =
			i === 0 ? previousTime.back_time : backTimeCalculation(endTime, estDuration / 1000); //check

		// Set the estimated duration, front time, end time and back time for the current part
		timingsArray.part[partsList[i]] = {
			estimated_duration: estDuration,
			front_time: frontTime,
			end_time: endTime,
			back_time: backTime
		};

		// Update the previous front, back and duration times
		previousTime.front_time = endTime;
		previousTime.back_time = backTime;
		previousTime.duration = estDuration;
		previousTime.end_time = frontTime + estDuration / 1000;

		const partItems = { [partsList[i]]: episodeArray.part[partsList[i]].items };

		//Handle item timings
		const itemDataArray = handleItemTimings(partItems, timingsArray.part, timingsData.item);

		for (let j = 0; j < Object.keys(itemDataArray).length; j++) {
			const key = Object.keys(itemDataArray)[j];

			timingsArray.item[key] = itemDataArray[key];
		}
	}

	console.log(timingsArray);

	return timingsArray;
};

export const handleItemTimings = (itemData: object, timingsPart: object, timingsItem: object) => {
	const itemDataArray = {};
	const previousTime = {
		front_time: timingsPart[Object.keys(itemData)[0]].front_time,
		end_time: 0,
		duration: 0,
		back_time: 0
	};

	for (const key in timingsPart) {
		if (key === Object.keys(itemData)[0]) {
			for (let i = 0; i < itemData[key].length; i++) {
				const currentItem = timingsItem[itemData[key][i]];

				if (currentItem !== undefined) {
					const estimatedDuration = currentItem.estimated_duration;
					const frontTime = i === 0 ? previousTime.front_time : previousTime.end_time;
					const endTime = endTimeCalculation(previousTime.front_time, estimatedDuration / 1000);
					const backTime =
						i === 0
							? previousTime.front_time
							: backTimeCalculation(endTime, estimatedDuration / 1000);

					itemDataArray[itemData[key][i]] = {
						estimatedDuration: estimatedDuration,
						front_time: frontTime,
						end_time: endTime,
						back_time: backTime
					};

					previousTime.front_time = endTime;
					previousTime.back_time = backTime;
					previousTime.duration = estimatedDuration;
					previousTime.end_time = frontTime + estimatedDuration / 1000;
				}
			}
		}
	}
	return itemDataArray;
};

// Calculate the end time based on the front time and duration
export const endTimeCalculation = (frontTime, duration) => {
	return frontTime + duration;
};

// Calculate the back time based on the previous back time and duration
export const backTimeCalculation = (previousBack, duration) => {
	return previousBack - duration;
};
