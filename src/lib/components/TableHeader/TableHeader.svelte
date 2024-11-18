<script lang="ts">
	// Import the FontAwesome icons
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	import type { Icon } from '@fortawesome/fontawesome-svg-core';

	let { icons }: { icons: { [key: string]: Icon } } = $props();
</script>

<thead
	class=" border bg-[#fafbfc] text-[#666666]"
	style="background-color: #fafbfc; color: #666666;"
>
	<tr>
		<th class="p-4 py-2">
			<br />
		</th>
		<th class="flex flex-row items-center gap-4 px-4 py-2 text-left">
			<FontAwesomeIcon
				icon={icons.start}
				class="box-border h-2.5 w-2.5 cursor-pointer rounded-full border-2 border-gray-400 p-2 text-gray-400"
			/>
			Rundown
		</th>
		<th class="border-r-2 p-4 py-2">
			<br />
		</th>
		<th class="border p-4 py-2"
			>Est. Duration
			<br />
		</th>
		<th class="border p-4 py-2"
			>Front Time
			<br />
		</th>
		<th class="border p-4 py-2"
			>End Time
			<br />
		</th>
		<th class="border p-4 py-2"
			>Back Time
			<br />
		</th>
		<th class="w-2 border p-4 py-2 text-center">
			<FontAwesomeIcon icon={icons.plus} class="box-border h-5 w-5 cursor-pointer text-gray-400" />
		</th>
	</tr>
</thead>
