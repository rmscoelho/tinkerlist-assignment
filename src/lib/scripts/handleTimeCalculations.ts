import type {
	EpisodeDataType,
	ItemsType,
	PartItems,
	TimingsDataType
} from '$lib/types/calculateTimingTypes';

// Handle date conversion
export const handleDateConversion = (date: number): string => {
	// Create a new date object
	const dtFormat = new Intl.DateTimeFormat('en-GB', {
		timeStyle: 'medium',
		timeZone: 'UTC'
	});

	// Format the date
	return dtFormat.format(new Date(date * 1000));
};

export const calculateTimmings = (episodeData: EpisodeDataType, timingsData: TimingsDataType) => {
	// Create a new object to store the calculated timings
	const timingsArray: TimingsDataType = timingsData ;
	const episodeArray: EpisodeDataType = episodeData;

	// Get the on air and off air times
	const onAirTime = timingsArray.episode.on_air_time;
	const offAirTime = timingsArray.episode.off_air_time;
	const partsList: PartItems = episodeData.episode.parts;

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

		// Get the items for the current part
		const partItems: { [x: number]: ItemsType[] } = {
			[partsList[i]]: episodeArray.part[partsList[i]].items
		};

		//Handle item timings
		const itemDataArray = handleItemTimings(partItems, timingsArray.part, timingsData.item);

		// Set the item timings in the timings array
		for (let j = 0; j < Object.keys(itemDataArray).length; j++) {
			// Get the key of the current item
			const key = Object.keys(itemDataArray)[j];

			// Add the item timings to the timings array
			timingsArray.item[key] = itemDataArray[key];
		}
	}

	console.log(timingsArray);
	// Return the timings array
	return timingsArray;
};

// Handle item timings
export const handleItemTimings = (itemData: object, timingsPart: object, timingsItem: object) => {
	// Create an empty object to store the item timings
	const itemDataArray = {};

	// Create variables for the previous front, end, duration and back times
	const previousTime = {
		front_time: timingsPart[Object.keys(itemData)[0]].front_time,
		end_time: 0,
		duration: 0,
		back_time: 0
	};

	// Loop through the items in the part
	for (const key in timingsPart) {
		// Check if the current item is the first item in the part
		if (key === Object.keys(itemData)[0]) {
			// Loop through the items in the part
			for (let i = 0; i < itemData[key].length; i++) {
				// Get the current item's timings
				const currentItem = timingsItem[itemData[key][i]];

				// Check if the current item has timings
				if (currentItem !== undefined) {
					// Calculate the estimated duration, front time, end time and back time
					const estimatedDuration = currentItem.estimated_duration;
					const frontTime = i === 0 ? previousTime.front_time : previousTime.end_time;
					const endTime = endTimeCalculation(previousTime.front_time, estimatedDuration / 1000);
					const backTime =
						i === 0
							? previousTime.front_time
							: backTimeCalculation(endTime, estimatedDuration / 1000);

					// Add the item timings to the itemDataArray
					itemDataArray[itemData[key][i]] = {
						estimatedDuration: estimatedDuration,
						front_time: frontTime,
						end_time: endTime,
						back_time: backTime
					};

					// Update the previous front, back and duration times
					previousTime.front_time = endTime;
					previousTime.back_time = backTime;
					previousTime.duration = estimatedDuration;
					previousTime.end_time = frontTime + estimatedDuration / 1000;
				}
			}
		}
	}
	// Return the itemDataArray
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
