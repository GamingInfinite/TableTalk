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
  U: () => UserDisplayName,
  a: () => playerID,
  b: () => playerRef,
  c: () => playerAnonStatus,
  d: () => playerAvatarURL,
  e: () => auth,
  f: () => db,
  g: () => lobbyPlayerRef,
  h: () => lobbiesRef,
  l: () => lobbyRef,
  p: () => player
});
module.exports = __toCommonJS(stdin_exports);
var import_index_22de79fe = require("./index-22de79fe.js");
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
var import_database = require("firebase/database");
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = import_index_22de79fe.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_22de79fe.b)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = import_index_22de79fe.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_22de79fe.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
const firebaseConfig = {
  apiKey: "AIzaSyC_hobr42NEOA46_O-YWYSoXfZgQvTIJa0",
  authDomain: "tabletalkproj.firebaseapp.com",
  projectId: "tabletalkproj",
  storageBucket: "tabletalkproj.appspot.com",
  messagingSenderId: "550808021827",
  appId: "1:550808021827:web:88c295a1c72ff68b885df6",
  measurementId: "G-ER3VK8XS20"
};
(0, import_app.initializeApp)(firebaseConfig);
const database = (0, import_database.getDatabase)();
const authorizer = (0, import_auth.getAuth)();
const UserDisplayName = writable("");
const db = readable(database);
const auth = readable(authorizer);
const player = writable();
const playerID = writable();
const playerAnonStatus = writable();
const playerAvatarURL = writable();
const playerRef = writable();
const lobbiesRef = writable();
const lobbyRef = writable();
const lobbyPlayerRef = writable();
