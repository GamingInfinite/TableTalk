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
  default: () => Lobby
});
module.exports = __toCommonJS(stdin_exports);
var import_index_22de79fe = require("../../chunks/index-22de79fe.js");
var import_stores_d972d50d = require("../../chunks/stores-d972d50d.js");
var import_database = require("firebase/database");
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
const Lobby = (0, import_index_22de79fe.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_UserDisplayName;
  let $lobbyRef, $$unsubscribe_lobbyRef;
  $$unsubscribe_UserDisplayName = (0, import_index_22de79fe.a)(import_stores_d972d50d.U, (value) => value);
  $$unsubscribe_lobbyRef = (0, import_index_22de79fe.a)(import_stores_d972d50d.l, (value) => $lobbyRef = value);
  let players = [];
  (0, import_database.child)($lobbyRef, "players");
  $$unsubscribe_UserDisplayName();
  $$unsubscribe_lobbyRef();
  return `<div class="${"btn-group flex flex-nowrap absolute ml-10 mt-10"}"><button class="${"btn btn-error"}"><a href="${"/lobbylist"}" class="${"flex w-full h-full justify-center items-center"}">\u2715
    </a></button></div>
<div class="${"flex flex-row"}"><div class="${"flex flex-col w-1/2"}"></div>
  <div class="${"flex flex-col w-1/2 text-center"}"><div>Player List</div>
    <div>${(0, import_index_22de79fe.f)(players, (player) => {
    return `${(0, import_index_22de79fe.e)(player)}`;
  })}</div></div></div>`;
});
