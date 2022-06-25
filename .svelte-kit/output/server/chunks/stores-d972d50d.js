import { n as noop, b as safe_not_equal } from "./index-22de79fe.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
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
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
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
initializeApp(firebaseConfig);
const database = getDatabase();
const authorizer = getAuth();
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
export { UserDisplayName as U, playerID as a, playerRef as b, playerAnonStatus as c, playerAvatarURL as d, auth as e, db as f, lobbyPlayerRef as g, lobbiesRef as h, lobbyRef as l, player as p };
