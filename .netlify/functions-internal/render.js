const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-2b4a0f46.js","js":["start-2b4a0f46.js","chunks/index-45f71731.js","chunks/index-65a915e8.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js'))
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
});
