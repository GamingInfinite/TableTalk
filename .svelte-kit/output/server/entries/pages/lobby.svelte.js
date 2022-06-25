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
  return `<div class="${"btn-group flex flex-nowrap absolute ml-10 mt-10"}"><button class="${"btn btn-error"}"><a href="${"/lobbylist"}" class="${"flex w-full h-full justify-center items-center"}">\u2715
    </a></button></div>
<div class="${"flex flex-row"}"><div class="${"flex flex-col w-1/2"}"></div>
  <div class="${"flex flex-col w-1/2 text-center"}"><div>Player List</div>
    <div>${each(players, (player) => {
    return `${escape(player)}`;
  })}</div></div></div>`;
});
export { Lobby as default };
