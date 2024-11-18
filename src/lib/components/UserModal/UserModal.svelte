<script lang="ts">
	// Import the FontAwesome icons
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '@fortawesome/fontawesome-svg-core/styles.css';
	import type { Icon } from '@fortawesome/fontawesome-svg-core';
	import UserPhoto from '$lib/assets/user-photo.png';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	//Import the props
	let {
		icons,
		modalOpen = $bindable()
	}: {
		icons: { [key: string]: Icon };
		modalOpen: boolean;
	} = $props();

	// toggle the modal
	const toggleModal = () => (modalOpen = !modalOpen);
</script>

<div
	class="modal fixed right-0 top-0 flex h-full w-[400px] items-center justify-center rounded-l-xl border-l-2 border-gray-200 bg-white shadow-xl"
	class:modal-open={modalOpen}
	transition:slide={{ duration: 300, easing: cubicOut, delay: 100 }}
>
	<div class="modal-box h-full w-full rounded-l-xl bg-white p-8 shadow-xl">
		<div class="flex flex-row items-center justify-between">
			<h3 class="text-lg font-bold">Developed by:</h3>
			<button class="modal-close" onclick={toggleModal} onkeyup={toggleModal} aria-hidden="true">
				<FontAwesomeIcon icon={icons.close} class="h-8 w-8" />
			</button>
		</div>
		<div class="modal-content">
			<div class="flex flex-col gap-4">
				<div class="flex flex-row items-center gap-4">
					<img
						src={UserPhoto}
						alt=""
						class="user-photo h-[100px] w-[100px] rounded-full border-2 border-gray-200 object-cover"
					/>
					<div class="flex flex-col gap-2">
						<span class="text-2xl font-bold">Ricardo Coelho</span>
						<span class="text-xl font-bold">18 August 1993</span>
					</div>
				</div>
				<div class="flex flex-col flex-wrap items-start justify-between gap-4">
					<div class="flex flex-row items-center gap-4">
						<FontAwesomeIcon icon={icons.email} class="h-6 w-6" />
						<a href="mailto:ricms_coelho@hotmail.com" target="_blank" class="text-gray-500"
							>ricms_coelho@hotmail.com</a
						>
					</div>
					<div class="flex flex-row items-center gap-4">
						<FontAwesomeIcon icon={icons.phone} class="h-6 w-6" />
						<span class="text-gray-500">+351 916 552 426</span>
					</div>
					<div class="flex flex-row items-center gap-4">
						<FontAwesomeIcon icon={icons.linkedin} class="h-6 w-6" />
						<a
							href="https://www.linkedin.com/in/ricardo-ms-coelho/"
							target="_blank"
							class="text-gray-500">LinkedIn</a
						>
					</div>
					<div class="flex flex-row items-center gap-4">
						<FontAwesomeIcon icon={icons.github} class="h-6 w-6" />
						<a href="https://github.com/rmscoelho" target="_blank" class="text-gray-500">GitHub</a>
					</div>
					<div class="flex flex-row items-center gap-4">
						<FontAwesomeIcon icon={icons.curriculum} class="h-6 w-6" />
						<a
							href="https://1drv.ms/b/c/008607f765a5d81a/EUfISHw3VQ1HgVRxognw5bQB8eQUbN_MwYyY2l4HnncsMA?e=C4pHlW"
							target="_blank"
							class="text-gray-500">Curriculum Vitae</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
