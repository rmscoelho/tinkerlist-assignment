<script lang="ts">
	// Import the FontAwesome icons
	import { type RotateProp, type Icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Import types and scripts
	import type { partDataType } from '$lib/types/DisplayDataTypes';
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations';
	import TableItem from '$lib/components/TableItem/TableItem.svelte';

	//Import the props
	let {
		part,
		itemNumber = $bindable(),
		icons
	}: { part: partDataType; itemNumber: number; icons: { [key: string]: Icon } } = $props();

	let partOpen: boolean = $state(true);
	let iconRotation: RotateProp = $derived(partOpen ? 90 : 270);
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
			<FontAwesomeIcon icon={icons.start} class="box-border h-2 w-2 " rotation={iconRotation} />
			PART
		</td>
		<td class=" border p-4 py-3 font-bold text-black">{part.title} </td>
		<td class=" border p-4 py-3 text-right font-bold text-black"
			>{handleDateConversion(part.timings.estimated_duration / 1000)}</td
		>
		<td class=" border p-4 py-3 text-right font-bold"
			>{handleDateConversion(part.timings.front_time)}</td
		>
		<td class=" border p-4 py-3 text-right font-bold"
			>{handleDateConversion(part.timings.end_time)}</td
		>
		<td class=" border p-4 py-3 text-right font-bold"
			>{handleDateConversion(part.timings.back_time)}</td
		>
		<td class=" border p-4 py-3 text-right font-bold"></td>
	</tr>

	<!--	Loop through the items in the part -->
	{#each Object.values(part.items) as item}
		<TableItem {item} {partOpen} bind:itemNumber {icons} />
	{/each}
</tbody>
