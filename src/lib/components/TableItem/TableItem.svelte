<script lang="ts">
	// Import the FontAwesome icons
	import { icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Import types and scripts
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations'; //Import the handleDateConversion function to convert the time to a readable format
	import type { itemsDataType } from '$lib/types/DisplayDataTypes'; //Import the itemsDataType type

	//Import the props
	let { item, partOpen }: { item: itemsDataType; partOpen: boolean } = $props();

	//Create a drop-down icon
	const dropDown = icon({ prefix: 'fas', iconName: 'play' });
</script>

<!--	Create the item row -->
<tr class="cursor-pointer border-none bg-[#fafbfc] p-4 {partOpen ? '' : 'hidden'}">
	<td class="w-1/12 p-4 py-3 text-center">1</td>
	<td class="flex flex-row items-center gap-4 rounded-l-xl border-y-2 border-l-2 bg-white p-4 py-3">
		<FontAwesomeIcon icon={dropDown} class="box-border h-3 w-3" />
		<span class="rounded-md bg-[#7b86a5] p-2 text-white">{item.title.toUpperCase()}</span></td
	>
	<td class="border-y-2 bg-white p-4 py-3">{item.title}</td>
	<td class="border-y-2 bg-white p-4 py-3"
		>{handleDateConversion(item.timings.estimated_duration / 1000)}</td
	>
	<td class="border-y-2 bg-white p-4 py-3">{handleDateConversion(item.timings.front_time)}</td>
	<td class="border-y-2 bg-white p-4 py-3">{handleDateConversion(item.timings.end_time)}</td>
	<td class="rounded-r-xl border-y-2 border-r-2 bg-white p-4 py-3"
		>{handleDateConversion(item.timings.back_time)}</td
	>
	<td class="p-4 py-3"></td>
</tr>
