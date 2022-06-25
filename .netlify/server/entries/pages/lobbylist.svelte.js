var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Lobbylist
});
module.exports = __toCommonJS(stdin_exports);
var import_index_22de79fe = require("../../chunks/index-22de79fe.js");
var import_stores_d972d50d = require("../../chunks/stores-d972d50d.js");
var import_database = require("firebase/database");
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
const Lobbylist = (0, import_index_22de79fe.c)(($$result, $$props, $$bindings, slots) => {
  let $UserDisplayName, $$unsubscribe_UserDisplayName;
  let $db, $$unsubscribe_db;
  let $$unsubscribe_lobbyPlayerRef;
  let $$unsubscribe_playerID;
  let $$unsubscribe_lobbyRef;
  let $$unsubscribe_lobbiesRef;
  $$unsubscribe_UserDisplayName = (0, import_index_22de79fe.a)(import_stores_d972d50d.U, (value) => $UserDisplayName = value);
  $$unsubscribe_db = (0, import_index_22de79fe.a)(import_stores_d972d50d.f, (value) => $db = value);
  $$unsubscribe_lobbyPlayerRef = (0, import_index_22de79fe.a)(import_stores_d972d50d.g, (value) => value);
  $$unsubscribe_playerID = (0, import_index_22de79fe.a)(import_stores_d972d50d.a, (value) => value);
  $$unsubscribe_lobbyRef = (0, import_index_22de79fe.a)(import_stores_d972d50d.l, (value) => value);
  $$unsubscribe_lobbiesRef = (0, import_index_22de79fe.a)(import_stores_d972d50d.h, (value) => value);
  let lobbyname = $UserDisplayName + "'s Lobby";
  let lobbypass = "";
  let lobbyList = [];
  function refreshLobbies() {
    lobbyList = [];
    (0, import_database.get)((0, import_database.ref)($db, "lobbies")).then((snapshot) => {
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
<div class="${"flex absolute justify-center text-xl flex-wrap mt-40 sm:mt-20 w-screen"}">${(0, import_index_22de79fe.f)(lobbyList, (lobby) => {
    return `<button class="${"btn btn-base-300 w-1/2 mx-2 mb-10"}"><a href="${"/lobby"}" class="${"flex w-full justify-around"}"><div>${(0, import_index_22de79fe.e)(lobby.name)}</div>
        <div>${(0, import_index_22de79fe.e)(lobby.players)}
        </div></a>
    </button>`;
  })}</div>
<input type="${"checkbox"}" id="${"newLobbyModal"}" class="${"modal-toggle"}">
<label for="${"newLobbyModal"}" class="${"modal cursor-pointer"}"><label class="${"modal-box relative"}" for="${""}"><label for="${"newLobbyModal"}" class="${"btn btn-sm btn-circle absolute right-2 top-2"}">\u2715
    </label>
    <div class="${"form-control w-full max-w-xs"}">
      <label class="${"label"}"><span class="${"label-text"}">Lobby Name</span></label>
      <input type="${"text"}"${(0, import_index_22de79fe.d)("placeholder", lobbyname, 0)} class="${"input input-bordered w-full max-w-xs"}"${(0, import_index_22de79fe.d)("value", lobbyname, 0)}></div>
    <div class="${"form-control w-full max-w-xs"}">
      <label class="${"label"}"><span class="${"label-text"}">Lobby Password</span></label>
      <input type="${"text"}" placeholder="${"Type here"}" class="${"input input-bordered w-full max-w-xs"}"${(0, import_index_22de79fe.d)("value", lobbypass, 0)}></div>
    <div class="${"flex justify-center"}"><button class="${"btn btn-secondary p-0 w-1/3 mt-4"}"><a href="${"/lobby"}" class="${"flex w-full h-full justify-center gap-2 px-4 items-center"}">+ Create Lobby
        </a></button></div></label>
</label>`;
});
