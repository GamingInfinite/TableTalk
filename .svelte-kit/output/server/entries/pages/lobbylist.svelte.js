import { c as create_ssr_component, a as subscribe, f as each, d as add_attribute, e as escape } from "../../chunks/index-22de79fe.js";
import { U as UserDisplayName, f as db, g as lobbyPlayerRef, a as playerID, l as lobbyRef, h as lobbiesRef } from "../../chunks/stores-d972d50d.js";
import { get, ref } from "firebase/database";
import "firebase/app";
import "firebase/auth";
const Lobbylist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $UserDisplayName, $$unsubscribe_UserDisplayName;
  let $db, $$unsubscribe_db;
  let $$unsubscribe_lobbyPlayerRef;
  let $$unsubscribe_playerID;
  let $$unsubscribe_lobbyRef;
  let $$unsubscribe_lobbiesRef;
  $$unsubscribe_UserDisplayName = subscribe(UserDisplayName, (value) => $UserDisplayName = value);
  $$unsubscribe_db = subscribe(db, (value) => $db = value);
  $$unsubscribe_lobbyPlayerRef = subscribe(lobbyPlayerRef, (value) => value);
  $$unsubscribe_playerID = subscribe(playerID, (value) => value);
  $$unsubscribe_lobbyRef = subscribe(lobbyRef, (value) => value);
  $$unsubscribe_lobbiesRef = subscribe(lobbiesRef, (value) => value);
  let lobbyname = $UserDisplayName + "'s Lobby";
  let lobbypass = "";
  let lobbyList = [];
  function refreshLobbies() {
    lobbyList = [];
    get(ref($db, "lobbies")).then((snapshot) => {
      let lobbyJson = snapshot.toJSON();
      let lobbyKeys = Object.keys(lobbyJson);
      lobbyKeys.sort(function(a, b) {
        return a == b ? 0 : a > b ? 1 : -1;
      });
      let lobbyNames = [];
      let playerCounts = [];
      let passwords = [];
      for (let i = 0; i < lobbyKeys.length; i++) {
        const element = lobbyKeys[i];
        let lobbyName = lobbyJson[element].name;
        lobbyNames.push(lobbyName);
        let playerCount = Object.keys(lobbyJson[element].players).length;
        playerCounts.push(playerCount);
        let password = lobbyJson[element].pass;
        passwords.push(password);
      }
      for (let i = 0; i < lobbyKeys.length; i++) {
        let lobby = { id: "", name: "", players: 0, pass: "" };
        lobby.id = lobbyKeys[i];
        lobby.name = lobbyNames[i];
        lobby.players = playerCounts[i];
        lobby.pass = passwords[i];
        lobbyList.push(lobby);
      }
      lobbyList = lobbyList;
    }).catch((error) => {
      console.log("No Lobbies");
      console.log(error);
    });
  }
  refreshLobbies();
  $$unsubscribe_UserDisplayName();
  $$unsubscribe_db();
  $$unsubscribe_lobbyPlayerRef();
  $$unsubscribe_playerID();
  $$unsubscribe_lobbyRef();
  $$unsubscribe_lobbiesRef();
  return `<div class="${"btn-group flex flex-nowrap absolute ml-10 mt-20 sm:mt-10"}"><button class="${"btn btn-error p-0 w-1/4"}"><a href="${"/"}" class="${"flex w-full h-full justify-center items-center"}">\u2715</a></button>
  <label for="${"newLobbyModal"}" class="${"btn rounded-none gap-2"}">+ New Lobby</label>
  <button class="${"btn btn-accent"}">Refresh</button></div>
<div class="${"flex absolute justify-center text-xl flex-wrap mt-40 sm:mt-20 w-screen"}">${each(lobbyList, (lobby) => {
    return `<button class="${"btn btn-base-300 w-1/2 mx-2 mb-10"}"><a href="${"/lobby"}" class="${"flex w-full justify-around"}"><div>${escape(lobby.name)}</div>
        <div>${escape(lobby.players)}
        </div></a>
    </button>`;
  })}</div>
<input type="${"checkbox"}" id="${"newLobbyModal"}" class="${"modal-toggle"}">
<label for="${"newLobbyModal"}" class="${"modal cursor-pointer"}"><label class="${"modal-box relative"}" for="${""}"><label for="${"newLobbyModal"}" class="${"btn btn-sm btn-circle absolute right-2 top-2"}">\u2715
    </label>
    <div class="${"form-control w-full max-w-xs"}">
      <label class="${"label"}"><span class="${"label-text"}">Lobby Name</span></label>
      <input type="${"text"}"${add_attribute("placeholder", lobbyname, 0)} class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", lobbyname, 0)}></div>
    <div class="${"form-control w-full max-w-xs"}">
      <label class="${"label"}"><span class="${"label-text"}">Lobby Password</span></label>
      <input type="${"text"}" placeholder="${"Type here"}" class="${"input input-bordered w-full max-w-xs"}"${add_attribute("value", lobbypass, 0)}></div>
    <div class="${"flex justify-center"}"><button class="${"btn btn-secondary p-0 w-1/3 mt-4"}"><a href="${"/lobby"}" class="${"flex w-full h-full justify-center gap-2 px-4 items-center"}">+ Create Lobby
        </a></button></div></label>
</label>`;
});
export { Lobbylist as default };
