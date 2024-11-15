import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async () => {
	const getEpisode = async () => {
		return await import('../data/episode.json').then((data) => data.default);
	};

	const getTimings = async () => {
		return await import('../data/timings.json').then((data) => data.default);
	};

	return {
		episode: await getEpisode(),
		timings: await getTimings()
	};
};
