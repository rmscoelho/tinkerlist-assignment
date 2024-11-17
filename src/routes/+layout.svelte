<script lang="ts">
	// Import the FontAwesome icons
	import { config, library } from '@fortawesome/fontawesome-svg-core';
	import { fas } from '@fortawesome/free-solid-svg-icons';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	// Configure the FontAwesome icons
	config.autoReplaceSvg = true;
	config.autoAddCss = false;
	library.add(fas);

	import Header from '$lib/components/Header/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />
	<main>
		{@render children()}
	</main>
</div>
