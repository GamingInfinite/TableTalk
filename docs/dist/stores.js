import { writable, readable } from "../snowpack/pkg/svelte/store.js";
import { initializeApp } from "../snowpack/pkg/firebase/app.js";
import { getAuth } from "../snowpack/pkg/firebase/auth.js";
import { getDatabase } from "../snowpack/pkg/firebase/database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_hobr42NEOA46_O-YWYSoXfZgQvTIJa0",
  authDomain: "tabletalkproj.firebaseapp.com",
  projectId: "tabletalkproj",
  storageBucket: "tabletalkproj.appspot.com",
  messagingSenderId: "550808021827",
  appId: "1:550808021827:web:88c295a1c72ff68b885df6",
  measurementId: "G-ER3VK8XS20",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase();

const authorizer = getAuth();

export const UserDisplayName = writable("");
export const Screen = writable(0);

export const db = readable(database);
export const auth = readable(authorizer);

export const player = writable();

export const playerID = writable();
export const playerAnonStatus = writable();
export const playerAvatarURL = writable();
export const playerRef = writable();

export const lobbiesRef = writable();
export const lobbyRef = writable();
export const lobbyPlayerRef = writable();
