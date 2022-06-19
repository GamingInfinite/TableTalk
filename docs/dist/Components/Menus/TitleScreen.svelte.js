import './TitleScreen.svelte.css.proxy.js';
/* src/Components/Menus/TitleScreen.svelte generated by Svelte v3.48.0 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	null_to_empty,
	safe_not_equal,
	space,
	text
} from "../../../snowpack/pkg/svelte/internal.js";

import { Deck } from "../../util.js";
import { UserDisplayName, SettingsModal } from "../../stores.js";
import "../../../snowpack/pkg/svelte.js";

function create_fragment(ctx) {
	let div0;
	let t1;
	let div1;
	let button0;
	let t2;
	let button0_class_value;
	let t3;
	let br;
	let t4;
	let button1;
	let t5;
	let button1_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			div0 = element("div");
			div0.textContent = "TableTalk";
			t1 = space();
			div1 = element("div");
			button0 = element("button");
			t2 = text("Play");
			t3 = space();
			br = element("br");
			t4 = space();
			button1 = element("button");
			t5 = text("Settings");
			attr(div0, "class", "title svelte-6jgmlm");
			attr(button0, "class", button0_class_value = "" + (null_to_empty("playButton " + /*bandaid*/ ctx[0]) + " svelte-6jgmlm"));
			attr(button1, "class", button1_class_value = "" + (null_to_empty("settings " + /*bandaid*/ ctx[0]) + " svelte-6jgmlm"));
			attr(div1, "class", "buttons");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
			append(div1, button0);
			append(button0, t2);
			append(div1, t3);
			append(div1, br);
			append(div1, t4);
			append(div1, button1);
			append(button1, t5);

			if (!mounted) {
				dispose = listen(button1, "click", /*toggleSettings*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*bandaid*/ 1 && button0_class_value !== (button0_class_value = "" + (null_to_empty("playButton " + /*bandaid*/ ctx[0]) + " svelte-6jgmlm"))) {
				attr(button0, "class", button0_class_value);
			}

			if (dirty & /*bandaid*/ 1 && button1_class_value !== (button1_class_value = "" + (null_to_empty("settings " + /*bandaid*/ ctx[0]) + " svelte-6jgmlm"))) {
				attr(button1, "class", button1_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	var username = "";

	UserDisplayName.subscribe(value => {
		username = value;

		if (username == "") {
			$$invalidate(0, bandaid = "disabled");
		} else {
			$$invalidate(0, bandaid = "");
		}
	});

	var bandaid = "disabled";
	let settings = false;

	function toggleSettings() {
		settings = !settings;
		SettingsModal.set(settings);
	}

	SettingsModal.subscribe(value => {
		settings = value;
	});

	var testDeck = new Deck(true);
	testDeck.shuffle();
	return [bandaid, toggleSettings];
}

class TitleScreen extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default TitleScreen;