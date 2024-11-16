<script lang="ts">
	import { page } from '$app/stores';
	import { calculateTimmings } from '$lib/scripts/handleTimeCalculations';

	// Get the page data
	let data = $page.data;

	// Get the episode data and timings data from the page data and clone them
	const episodeData = JSON.parse(JSON.stringify(data.episode));
	const timingsData = JSON.parse(JSON.stringify(data.timings));

	// Calculate the timings and fill in the blanks
	const generateTimings = JSON.parse(JSON.stringify(calculateTimmings(episodeData, timingsData)));
</script>

<svelte:head>
	<title>Tinkerlist Assignment</title>
	<meta content="Tinkerlist Assignment" name="description" />
</svelte:head>

<section>
	<div class="relative overflow-hidden shadow-md">
		<table class="w-full table-auto text-left">
			<thead
				class=" bg-[#6b7280] text-[#e5e7eb]"
				style="background-color: #6b7280; color: #e5e7eb;"
			>
				<tr>
					<!--[-->
					<td class="p-4 py-1" contenteditable="true">Product-ID</td>
					<td class="p-4 py-1" contenteditable="true">Description</td>
					<td class="p-4 py-1" contenteditable="true">Price</td>
					<td class="p-4 py-1" contenteditable="true"></td>
					<td class="p-4 py-1" contenteditable="true"></td>
					<td class="p-4 py-1" contenteditable="true"></td>
					<td class="p-4 py-1" contenteditable="true"></td>
					<td class="p-4 py-1" contenteditable="true"></td>
					<!--]-->
				</tr>
			</thead>
			<tbody
				class="bg-[#FFFFFF] bg-white text-[#6b7280] text-gray-500"
				style="background-color: #FFFFFF; color: #6b7280;"
			>
				<!--[-->
				<tr class=" py-5">
					<!--[-->
					<td class=" p-4 py-5" contenteditable="true">YY-853581</td>
					<td class=" p-4 py-5" contenteditable="true">Notebook Basic</td>
					<td class=" p-4 py-5" contenteditable="true">$ 299</td>
					<td class=" p-4 py-5" contenteditable="true">YY-853599</td>
					<td class=" p-4 py-5" contenteditable="true">Notebook Pro</td>
					<td class=" p-4 py-5" contenteditable="true">$ 849</td>
					<td class=" p-4 py-5" contenteditable="true">$ 849</td>
					<td class=" p-4 py-5" contenteditable="true"></td>
					<!--]-->
				</tr>
				<!--]-->
			</tbody>
		</table>
	</div>
</section>
