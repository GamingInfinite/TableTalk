// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".title.svelte-1lsurz4{padding-top:10vh;padding-bottom:10vh}.disabled.svelte-1lsurz4{opacity:0.5;pointer-events:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}