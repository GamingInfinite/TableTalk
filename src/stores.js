import { writable, readable } from "svelte/store";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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
export const lobbyPlayerList = writable();
