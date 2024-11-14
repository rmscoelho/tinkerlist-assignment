import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

const EPISODE_URL =
	'https://file.notion.so/f/f/0268e448-df25-4257-89b3-5b649ad1f5be/e205d0d9-4edc-4802-bc99-5f1f5ad48c66/episode.json?table=block&id=7bc62427-eb05-47cc-85a7-0e5679ce0d7e&spaceId=0268e448-df25-4257-89b3-5b649ad1f5be&expirationTimestamp=1731628800000&signature=skT_menWVRZBqcEOBg2yIfcxaKyhYqeI_NeUSYI_OaY&downloadName=episode.json';
const TIMING_URL =
	'https://file.notion.so/f/f/0268e448-df25-4257-89b3-5b649ad1f5be/6fa7d8fd-ae07-4f20-9f40-dcdc54cb3ebe/timings.json?table=block&id=23ccd31f-c7b2-4649-b353-c7e25f742b22&spaceId=0268e448-df25-4257-89b3-5b649ad1f5be&expirationTimestamp=1731636000000&signature=P7RtethOEVg27cWrhjDBFZJ4H1CUzT--PyzNEK3BphE&downloadName=timings.json';

export const load: PageServerLoad = async () => {
	const getEpisode = async () => {
		try {
			const response = await fetch(EPISODE_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			return await response.json();
		} catch (err: unknown) {
			const message = `Error fetching data: ${err}`;
			return error(500, message);
		}
	};

	const getTimings = async () => {
		try {
			const response = await fetch(TIMING_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			return await response.json();
		} catch (err: unknown) {
			const message = `Error fetching data: ${err}`;
			return error(500, message);
		}
	};

	return {
		episode: await getEpisode(),
		timings: await getTimings()
	};
};
