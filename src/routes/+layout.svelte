<script lang="ts">
	// Import the FontAwesome icons
	import { config, library } from '@fortawesome/fontawesome-svg-core';
	import { fas } from '@fortawesome/free-solid-svg-icons';
	import { far } from '@fortawesome/free-regular-svg-icons';
	import { fab } from '@fortawesome/free-brands-svg-icons';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	// Configure the FontAwesome icons
	config.autoReplaceSvg = false;
	config.autoAddCss = false;
	library.add(fas, far, fab);

	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
