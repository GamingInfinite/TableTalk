// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".title.svelte-6jgmlm{padding-top:10vh;padding-bottom:10vh}.playButton.svelte-6jgmlm{background-color:green;border:none;text-align:center;width:20vw;font-family:\"Roboto\", sans-serif;font-size:50px;color:black;border-radius:20px}.settings.svelte-6jgmlm{background-color:blue;border:none;text-align:center;width:20vw;font-family:\"Roboto\", sans-serif;font-size:50px;color:black;border-radius:20px}.disabled.svelte-6jgmlm{opacity:0.5;pointer-events:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}