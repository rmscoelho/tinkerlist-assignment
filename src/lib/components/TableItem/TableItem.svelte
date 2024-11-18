<script lang="ts">
	// Import the FontAwesome icons
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import type { Icon } from '@fortawesome/fontawesome-svg-core';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	// Import types and scripts
	import { handleDateConversion } from '$lib/scripts/handleTimeCalculations'; //Import the handleDateConversion function to convert the time to a readable format
	import type { itemsDataType } from '$lib/types/DisplayDataTypes'; //Import the itemsDataType type
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	//Import the props
	let {
		item,
		partOpen,
		itemNumber = $bindable(),
		icons
	}: {
		item: itemsDataType;
		partOpen: boolean;
		itemNumber: number;
		icons: { [key: string]: Icon };
	} = $props();

	//Create a derived value to update the item number
	let value: number = $state(itemNumber);

	//Increment the item number
	itemNumber++;

	let itemOpen: boolean = $state(false);
</script>

<!--	Create the item row -->
<tr
	class="cursor-pointer border-none bg-[#fafbfc] p-4 {partOpen ? '' : 'hidden'}"
	onclick={() => (itemOpen = !itemOpen)}
	transition:slide={{ duration: 300, easing: cubicOut, delay: 100 }}
>
	<td class="w-1/12 p-2 text-center">{value}</td>
	<td class="flex flex-row items-center gap-4 rounded-l-xl border-y-2 border-l-2 bg-white p-2">
		<FontAwesomeIcon icon={icons.start} class="box-border h-2 w-2 text-gray-400" />
		<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">ITEM {value}</span></td
	>
	<td class="border-y-2 bg-white p-2">{item.title}</td>
	<td class="border-y-2 border-l-2 bg-white p-2 text-right"
		>{handleDateConversion(item.timings.estimated_duration / 1000)}</td
	>
	<td class="border-y-2 border-l-2 bg-white p-2 text-right"
		>{handleDateConversion(item.timings.front_time)}</td
	>
	<td class="border-y-2 border-l-2 bg-white p-2 text-right"
		>{handleDateConversion(item.timings.end_time)}</td
	>
	<td class="rounded-r-xl border-2 bg-white p-2 text-right"
		>{handleDateConversion(item.timings.back_time)}</td
	>
	<td class="p-2"></td>
</tr>

{#if itemOpen && partOpen}
	<tr class="cursor-pointer border-none bg-[#fafbfc] p-4">
		<td class="w-1/12 p-2 text-center"></td>
		<td class="items-center gap-2 rounded-xl border-2 bg-white p-2" colspan="2">
			<div class="flex flex-col gap-2">
				<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">ID</span>
				<span class="p-2 font-bold">{item.id}</span>
			</div>
		</td>
		<td class="items-center gap-2 rounded-xl border-2 bg-white p-2">
			<div class="flex flex-col gap-2">
				<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">Estimated Duration</span>
				<span class="p-2 font-bold"
					>{handleDateConversion(item.timings.estimated_duration / 1000)}</span
				>
			</div>
		</td>
		<td class="items-center gap-2 rounded-xl border-2 bg-white p-2">
			<div class="flex flex-col gap-2">
				<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">Front Time</span>
				<span class="p-2 font-bold">{handleDateConversion(item.timings.front_time)}</span>
			</div>
		</td>
		<td class="items-center gap-2 rounded-xl border-2 bg-white p-2">
			<div class="flex flex-col gap-2">
				<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">End Time</span>
				<span class="p-2 font-bold">{handleDateConversion(item.timings.end_time)}</span>
			</div>
		</td>
		<td class="items-center gap-2 rounded-xl border-2 bg-white p-2">
			<div class="flex flex-col gap-2">
				<span class="rounded-md bg-[#7b86a5] p-2 font-bold text-white">Back Time</span>
				<span class="p-2 font-bold">{handleDateConversion(item.timings.back_time)}</span>
			</div>
		</td>
	</tr>
{/if}
