// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap\");.titleScreen.svelte-em42kk{background-color:rgb(12, 171, 199);height:100vh;text-align:center;font-family:\"Roboto\", sans-serif;font-size:100px}.title.svelte-em42kk{padding-top:10vh;padding-bottom:10vh}.playButton.svelte-em42kk{background-color:green;border:none;text-align:center;width:20vw;font-family:\"Roboto\", sans-serif;font-size:50px;color:black;border-radius:20px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}