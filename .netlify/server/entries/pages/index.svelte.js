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
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_22de79fe = require("../../chunks/index-22de79fe.js");
var import_stores_d972d50d = require("../../chunks/stores-d972d50d.js");
var import_database = require("firebase/database");
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
const Routes = (0, import_index_22de79fe.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_playerRef;
  $$unsubscribe_playerRef = (0, import_index_22de79fe.a)(import_stores_d972d50d.b, (value) => value);
  let nameInput;
  var username = "";
  import_stores_d972d50d.U.subscribe((value) => {
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
          <input type="${"text"}"${(0, import_index_22de79fe.d)("placeholder", username, 0)} class="${"input input-bordered w-full max-w-xs"}"${(0, import_index_22de79fe.d)("value", nameInput, 0)}></div>
        <div class="${"flex justify-center mt-6"}"><button class="${"btn btn-secondary"}">Change Username
          </button></div></label></label></div>
</div>`;
});
