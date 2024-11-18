<script lang="ts">
	import type { TimingsDataType, EpisodeDataType } from '$lib/types/CalculateTimingTypes';
	// Import the FontAwesome icons
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Import components and scripts
	import { generateDisplayData } from '$lib/scripts/generateDisplayData';
	import EpisodeHeader from '$lib/components/EpisodeHeader/EpisodeHeader.svelte';
	import TableHeader from '$lib/components/TableHeader/TableHeader.svelte';
	import TableBody from '$lib/components/TableBody/TableBody.svelte';

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
</script>

<section class="m-auto bg-white">
	<!--	Call the Episode Header component -->
	<EpisodeHeader {generateTimings} />
	<!--	Create the table-->
	<table
		class="w-full table-auto border-separate border-spacing-y-2 bg-[#fafbfc] text-left shadow-md"
	>
		<!-- Call the Table Header component -->
		<TableHeader />
		<!-- Loop through the parts of the episode -->
		{#each Object.values(displayData.parts) as part}
			<TableBody {part} />
		{/each}
	</table>
</section>
