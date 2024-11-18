<script lang="ts">
	import { page } from '$app/stores';
	import { calculateTimings } from '$lib/scripts/handleTimeCalculations';
	import EpisodeTable from '$lib/components/EpisodeTable/EpisodeTable.svelte';

	// Get the page data
	let data = $derived($page.data);

	// Get the episode data and timings data from the page data and clone them
	let episodeData = $derived(data.episode);
	let timingsData = $derived(data.timings);

	// Calculate the timings and fill in the blanks
	let generateTimings = $derived(calculateTimings(episodeData, timingsData));
</script>

<svelte:head>
	<title>Tinkerlist Assignment</title>
	<meta content="Tinkerlist Assignment" name="description" />
</svelte:head>

<section class="mx-auto w-[1280px] bg-white shadow-lg">
	<EpisodeTable {generateTimings} {episodeData} />
</section>
