export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-44e125d6.js","js":["start-44e125d6.js","chunks/index-45f71731.js","chunks/index-65a915e8.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "lobby",
				pattern: /^\/lobby\/?$/,
				names: [],
				types: [],
				path: "/lobby",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "lobbylist",
				pattern: /^\/lobbylist\/?$/,
				names: [],
				types: [],
				path: "/lobbylist",
				shadow: null,
				a: [0,4],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
