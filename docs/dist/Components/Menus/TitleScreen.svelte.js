import './TitleScreen.svelte.css.proxy.js';
/* src/Components/Menus/TitleScreen.svelte generated by Svelte v3.48.0 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "../../../snowpack/pkg/svelte/internal.js";

import { Card, Deck } from "../../util.js";
import { UserDisplayName } from "../../stores.js";

function create_fragment(ctx) {
	let div0;
	let t1;
	let div1;

	return {
		c() {
			div0 = element("div");
			div0.textContent = "TableTalk";
			t1 = space();
			div1 = element("div");
			div1.innerHTML = `<button class="playButton svelte-yiky05">Play</button>`;
			attr(div0, "class", "title svelte-yiky05");
			attr(div1, "class", "buttons");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
		}
	};
}

function instance($$self) {
	var username = "";

	UserDisplayName.subscribe(value => {
		username = value;
	});

	var testDeck = new Deck(true);
	testDeck.shuffle();
	return [];
}

class TitleScreen extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default TitleScreen;