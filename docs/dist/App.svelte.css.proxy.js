// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap\");.screen.svelte-t0921d{background-color:rgb(12, 171, 199);height:100vh;text-align:center;font-weight:900;font-family:\"Roboto\", sans-serif;font-size:10vh}.hidden.svelte-t0921d{display:none}.block.svelte-t0921d{display:block}.signin.svelte-t0921d{background-color:rgb(0, 23, 128);border:none;text-align:center;font-family:\"Roboto\", sans-serif;font-size:x-large;color:white;padding:1rem;border-radius:20px}.signInModalWrapper.svelte-t0921d{background-color:white;position:absolute;top:5rem;left:30vw;font-weight:200;height:50vh;width:40vw;border-radius:20px;z-index:50}.signInModalHeader.svelte-t0921d{border-bottom-style:solid;border-color:rgb(0, 0, 0)}.preventative-div.svelte-t0921d{position:absolute;width:100vw;height:100vh;top:0;left:0;background-color:black;opacity:0.5;z-index:40}.dropdownbutton.svelte-t0921d{background-color:white;font-size:medium;border-radius:20px;white-space:nowrap}.oauthBtn.svelte-t0921d{white-space:nowrap;font-size:x-large;justify-content:center;border-style:solid;border-radius:10px;padding:1rem}.oauth-icon.svelte-t0921d{position:relative;top:0.5rem;width:40px}#userStub.svelte-t0921d{position:absolute;font-family:\"Roboto\", sans-serif;font-weight:400;font-size:x-large;z-index:1;margin-top:2rem;margin-right:2rem;right:0;top:0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}