<script lang="ts">
	import type { TimingsDataType } from '$lib/types/CalculateTimingTypes';
	// Import the FontAwesome icons
	import { icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';

	let { generateTimings }: { generateTimings: TimingsDataType } = $props();

	const arrowLeft = icon({ prefix: 'fas', iconName: 'arrow-left' });
	const dropDown = icon({ prefix: 'fas', iconName: 'chevron-down' });
	const flag = icon({ prefix: 'fas', iconName: 'flag' });
	const timer = icon({ prefix: 'fas', iconName: 'stopwatch' });
</script>

<section class="episode-header m-auto flex flex-row justify-between gap-10 bg-white p-4 text-left">
	<div class="episode-header-timings container flex w-full flex-row gap-10 text-left">
		<div class="cursor-pointer border-r-2 border-gray-200 p-1 pr-3">
			<FontAwesomeIcon icon={arrowLeft} class="h-5 w-5 text-gray-400" size="lg" />
		</div>
		<div
			class="flex cursor-pointer flex-row items-center justify-center gap-1 text-xl text-gray-400"
		>
			Live
			<FontAwesomeIcon icon={dropDown} class="h-3.5 w-3.5 " size="lg" />
		</div>
		<div class="flex flex-row items-center justify-center gap-10 text-xl font-normal text-gray-400">
			<div class="on-air flex flex-row items-center gap-2">
				<FontAwesomeIcon icon={flag} class="h-5 w-5 text-green-600" size="lg" />
				{handleDateConversion(generateTimings.episode.on_air_time)}
			</div>
			<div class="off-air flex flex-row items-center gap-2">
				<FontAwesomeIcon icon={flag} class="h-5 w-5 text-red-600" size="lg" />
				{handleDateConversion(generateTimings.episode.off_air_time)}
			</div>
			<div class="duration flex flex-row items-center gap-2">
				<FontAwesomeIcon icon={timer} class="text-grey-500 h-5 w-5" size="lg" />
				{handleDateConversion(
					generateTimings.episode.off_air_time - generateTimings.episode.on_air_time
				)}
			</div>
		</div>
	</div>

	<div class="episode-header-user container flex w-full flex-row gap-10 text-left"></div>
</section>
