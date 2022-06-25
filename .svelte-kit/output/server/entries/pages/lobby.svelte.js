import { c as create_ssr_component, a as subscribe, f as each, e as escape } from "../../chunks/index-22de79fe.js";
import { U as UserDisplayName, l as lobbyRef } from "../../chunks/stores-d972d50d.js";
import { child } from "firebase/database";
import "firebase/app";
import "firebase/auth";
const Lobby = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_UserDisplayName;
  let $lobbyRef, $$unsubscribe_lobbyRef;
  $$unsubscribe_UserDisplayName = subscribe(UserDisplayName, (value) => value);
  $$unsubscribe_lobbyRef = subscribe(lobbyRef, (value) => $lobbyRef = value);
  let players = [];
  child($lobbyRef, "players");
  $$unsubscribe_UserDisplayName();
  $$unsubscribe_lobbyRef();
  return `<div class="${"btn-group flex flex-nowrap absolute ml-10 mt-10"}"><button class="${"btn btn-error"}"><a href="${"/lobbylist"}" class="${"flex w-full h-full justify-center items-center"}"><svg class="${"h-4 inline-block"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 384 512"}"><path fill="${"currentColor"}" d="${"M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"}"></path></svg></a></button></div>
<div class="${"flex flex-row"}"><div class="${"flex flex-col w-1/2"}"></div>
  <div class="${"flex flex-col w-1/2 text-center"}"><div>Player List</div>
    <div>${each(players, (player) => {
    return `${escape(player.name)}`;
  })}</div></div></div>`;
});
export { Lobby as default };
