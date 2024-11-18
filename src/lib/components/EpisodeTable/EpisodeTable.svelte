<script lang="ts">
	import type { TimingsDataType, EpisodeDataType } from '$lib/types/CalculateTimingTypes';
	// Import the FontAwesome icons
	import '@fortawesome/fontawesome-svg-core/styles.css';
	import { type Icon, icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	// Import components and scripts
	import { generateDisplayData } from '$lib/scripts/generateDisplayData';
	import EpisodeHeader from '$lib/components/EpisodeHeader/EpisodeHeader.svelte';
	import TableHeader from '$lib/components/TableHeader/TableHeader.svelte';
	import TableBody from '$lib/components/TableBody/TableBody.svelte';
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';

	//Import the props
	let {
		generateTimings,
		episodeData
	}: { generateTimings: TimingsDataType; episodeData: EpisodeDataType } = $props();

	//Create derived data
	const newTimingsData = $derived(generateTimings);
	const newEpisodeData = $derived(episodeData);

	//Create the display data
	const displayData = $derived(generateDisplayData(newEpisodeData, newTimingsData));

	const icons: { [key: string]: Icon } = {
		arrowLeft: icon({ prefix: 'fas', iconName: 'arrow-left' }),
		dropDown: icon({ prefix: 'fas', iconName: 'chevron-down' }),
		flag: icon({ prefix: 'fas', iconName: 'flag' }),
		timer: icon({ prefix: 'fas', iconName: 'stopwatch' }),
		start: icon({ prefix: 'fas', iconName: 'play' }),
		plus: icon({ prefix: 'fas', iconName: 'plus' })
	};

	let displayTable = $state(true);
	let itemNumber = $state(1);
</script>

<section class="m-auto bg-white">
	<!--	Call the Episode Header component -->
	<EpisodeHeader {generateTimings} {icons} bind:displayTable bind:itemNumber />
	<!--	Create the table-->
	{#if displayTable}
		<table
			class="w-full table-auto border-separate border-spacing-y-2 bg-[#fafbfc] text-left shadow-md"
		>
			<!-- Call the Table Header component -->
			<TableHeader {icons} />
			<!-- Loop through the parts of the episode -->
			{#each Object.values(displayData.parts) as part}
				<TableBody {part} bind:itemNumber {icons} />
			{/each}

			<tfoot>
				<tr>
					<td class="px-4 text-right" colspan="6">
						<FontAwesomeIcon icon={icons.flag} class="h-5 w-5 text-red-600" size="lg" />
					</td>
					<td class="rounded-xl border-2 bg-white p-4 py-3 text-right text-black">
						{handleDateConversion(generateTimings.episode.off_air_time)}
					</td>
				</tr>
			</tfoot>
		</table>
	{/if}
</section>
