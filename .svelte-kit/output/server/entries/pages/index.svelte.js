import { c as create_ssr_component, a as subscribe, d as add_attribute } from "../../chunks/index-22de79fe.js";
import { U as UserDisplayName, b as playerRef } from "../../chunks/stores-d972d50d.js";
import "firebase/database";
import "firebase/app";
import "firebase/auth";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_playerRef;
  $$unsubscribe_playerRef = subscribe(playerRef, (value) => value);
  let nameInput;
  var username = "";
  UserDisplayName.subscribe((value) => {
    username = value;
  });
  $$unsubscribe_playerRef();
  return `${$$result.head += `${$$result.title = `<title>TableTalk</title>`, ""}`, ""}

<div class="${"flex justify-center font-black text-6xl mt-40 sm:text-9xl sm:my-20"}">TableTalk</div>
<div class="${"flex flex-col justify-center h-96 items-center"}"><div class="${"flex-row mb-10"}"><a class="${["btn btn-accent", username == "" ? "btn-disabled" : ""].join(" ").trim()}" href="${"/lobbylist"}">Play
    </a></div>
  <div class="${"flex-row"}"><label for="${"settingsModal"}" class="${["btn btn-secondary", username == "" ? "btn-disabled" : ""].join(" ").trim()}">Settings
    </label>
    <input type="${"checkbox"}" id="${"settingsModal"}" class="${"modal-toggle"}">
    <label for="${"settingsModal"}" class="${"modal cursor-pointer"}"><label class="${"modal-box relative"}" for="${""}"><label for="${"settingsModal"}" class="${"btn btn-sm btn-circle absolute right-2 top-2"}">\u2715
        </label>
        <div class="${"form-control w-full max-w-xs"}">
          <label class="${"label"}"><span class="${"label-text"}">Username</span></label>
          <input type="${"text"}"${add_attribute("placeholder", username, 0)} class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", nameInput, 0)}></div>
        <div class="${"flex justify-center mt-6"}"><button class="${"btn btn-secondary"}">Change Username
          </button></div></label></label></div>
</div>`;
});
export { Routes as default };
