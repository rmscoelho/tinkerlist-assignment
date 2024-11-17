import type { EpisodeDataType, Timings, TimingsDataType } from '$lib/types/calculateTimingTypes';

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
	const timingsArray: TimingsDataType = timingsData;
	const episodeArray: EpisodeDataType = episodeData;

	// Get the on air and off-air times
	const onAirTime = timingsArray.episode.on_air_time;
	const offAirTime = timingsArray.episode.off_air_time;

	// Create variables for the previous part front, end, duration and back times
	const previousTime: Timings = {
		estimated_duration: offAirTime - onAirTime,
		front_time: onAirTime,
		end_time: offAirTime,
		back_time: offAirTime - (offAirTime - onAirTime)
	};

	// Loop through the parts of the episode
	// get current part index
	let count = 0;
	// Loop through the parts of the timings
	for (const key in timingsArray.part) {
		// Check if the current part is the last part of the episode
		const isLastPart = count === Object.keys(timingsArray.part).length - 1;
		// Get the estimated duration, front time, end time and back time for the current part
		const estDuration = timingsArray.part[key].estimated_duration; //check
		const frontTime = count === 0 ? previousTime.front_time : previousTime.end_time; //check
		const endTime = endTimeCalculation(previousTime.front_time, estDuration / 1000); //check
		const backTime =
			count === 0
				? previousTime.back_time
				: backTimeCalculation(previousTime.back_time, previousTime.estimated_duration / 1000); //check

		// Set the estimated duration, front time, end time and back time for the current part
		timingsArray.part[key] = {
			estimated_duration: estDuration,
			front_time: frontTime,
			end_time: endTime,
			back_time: isLastPart ? offAirTime - estDuration / 1000 : backTime
		};

		// Update the previous front, back and duration times
		previousTime.front_time = endTime;
		previousTime.back_time = backTime;
		previousTime.estimated_duration = estDuration;
		previousTime.end_time = frontTime + estDuration / 1000;

		//Handle item timings
		// get current item index
		let itemCount = 0;
		// check if current item is last item in part
		const isLastItem = itemCount === episodeArray.part[key].items.length - 1;

		// Create variables for the previous item front, end, duration and back times
		const previousItemTime = {
			front_time: timingsArray.part[key].front_time,
			end_time: 0,
			estimated_duration: 0,
			back_time: isLastItem ? timingsArray.part[key].end_time : 0
		};

		// Loop through the items in the part
		for (const itemKey of episodeArray.part[key].items) {
			// Get the current item data
			const currentItem = timingsArray.item[itemKey.toString()];

			// Calculate the estimated duration, front time, end time and back time
			const itemDuration = currentItem.estimated_duration;

			// Get the estimated duration, front time, end time and back time for the current item
			const itemFrontTime =
				itemCount === 0 ? timingsArray.part[key].front_time : previousItemTime.end_time;
			const itemEndTime = endTimeCalculation(previousItemTime.front_time, itemDuration / 1000);
			const itemBackTime =
				itemCount === 0
					? timingsArray.part[key].front_time
					: backTimeCalculation(
							previousItemTime.back_time,
							previousItemTime.estimated_duration / 1000
						);

			// Add the item timings to the timings array
			timingsArray.item[itemKey.toString()] = {
				estimated_duration: itemDuration,
				front_time: itemFrontTime,
				end_time: itemEndTime,
				back_time: isLastItem ? timingsArray.part[key].end_time : itemBackTime
			};

			// Update the previous front, back and duration times
			previousItemTime.front_time = itemEndTime;
			previousItemTime.back_time = itemBackTime;
			previousItemTime.estimated_duration = itemDuration;
			previousItemTime.end_time = itemFrontTime + itemDuration / 1000;

			// increment item count
			itemCount++;
		}

		// increment part count
		count++;
	}

	// Return the completed timings array
	return timingsArray;
};

// Calculate the end time based on the front time and duration
export const endTimeCalculation = (frontTime: number, duration: number) => frontTime + duration;
// Calculate the back time based on the previous back time and duration
export const backTimeCalculation = (previousBack: number, duration: number) =>
	previousBack - duration;
