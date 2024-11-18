<script lang="ts">
	// Import the FontAwesome icons
	import { icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Import types and scripts
	import type { partDataType } from '$lib/types/DisplayDataTypes';
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';
	import TableItem from '$lib/components/TableItem/TableItem.svelte';

	//Import the props
	let { part }: { part: partDataType } = $props();

	//Create a drop-down icon
	const dropDown = icon({ prefix: 'fas', iconName: 'play' });

	let partOpen: boolean = $state(true);
	let itemNumber: number = $state(1);
</script>

<!-- Create the table body -->
<tbody class=" bg-[#fafbfc] text-[#6b7280]" style="background-color: #e9ebf1; color: #6b7280;">
	<!--	Create the part row -->
	<tr class="cursor-pointer border bg-[#e9ebf1] py-3" onclick={() => (partOpen = !partOpen)}>
		<td class=" border p-4 py-3">
			<br />
		</td>
		<td
			class=" text-size-lg flex cursor-pointer flex-row items-center gap-2 border p-4 py-3 font-bold text-black"
		>
			<FontAwesomeIcon icon={dropDown} class="box-border h-2 w-2 {partOpen ? 'rotate-90' : ''}" />
			PART
		</td>
		<td class=" border p-4 py-3">{part.title} </td>
		<td class=" border p-4 py-3">{handleDateConversion(part.timings.estimated_duration / 1000)}</td>
		<td class=" border p-4 py-3">{handleDateConversion(part.timings.front_time)}</td>
		<td class=" border p-4 py-3">{handleDateConversion(part.timings.end_time)}</td>
		<td class=" border p-4 py-3">{handleDateConversion(part.timings.back_time)}</td>
		<td class=" border p-4 py-3"></td>
	</tr>

	<!--	Loop through the items in the part -->
	{#each Object.values(part.items) as item}
		<TableItem {item} {partOpen} />
	{/each}
</tbody>
