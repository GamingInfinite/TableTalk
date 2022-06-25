export { matchers } from './client-matchers.js';

export const components = [
	() => import("..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\runtime\\components\\error.svelte"),
	() => import("..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\src\\routes\\lobby.svelte"),
	() => import("..\\..\\src\\routes\\lobbylist.svelte")
];

export const dictionary = {
	"": [[0, 2], [1]],
	"lobby": [[0, 3], [1]],
	"lobbylist": [[0, 4], [1]]
};