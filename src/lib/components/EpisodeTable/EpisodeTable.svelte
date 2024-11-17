<script lang="ts">
	import type { TimingsDataType } from '$lib/types/calculateTimingTypes';
	// Import the FontAwesome icons
	import { icon } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';

	export let generateTimings: TimingsDataType;
	export let episodeData: TimingsDataType;

	const arrowLeft = icon({ prefix: 'fas', iconName: 'arrow-left' });
	const dropDown = icon({ prefix: 'fas', iconName: 'chevron-down' });
</script>

<section class="m-auto bg-white p-4">
	<div class="container w-full table-auto text-left">
		<FontAwesomeIcon icon={arrowLeft} class="h-5 w-5 " size="lg" />
	</div>
</section>

<style lang="scss">
	@import '../../styles/variables';
</style>
