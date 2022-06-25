<script lang="ts">
  import {
    UserDisplayName,
    db,
    lobbiesRef,
    lobbyRef,
    lobbyPlayerRef,
    playerID,
  } from "../stores";

  import { get, ref, push, set, child } from "firebase/database";

  import { onMount } from "svelte";

  let lobbyname: string = $UserDisplayName + "'s Lobby";
  let lobbypass: string = "";
  let lobbyList: lobbyData[] = [];

  function createLobby() {
    lobbiesRef.set(push(ref($db, "lobbies/")));
    lobbyRef.set(ref($db, "lobbies/" + $lobbiesRef.key));
    lobbyPlayerRef.set(
      ref($db, "lobbies/" + $lobbiesRef.key + "/players/" + $playerID)
    );
    set($lobbiesRef, {
      name: lobbyname,
      pass: lobbypass,
    });
    set($lobbyPlayerRef, {
      name: $UserDisplayName,
      host: true,
    });
  }

  function joinLobby(id: string) {
    lobbiesRef.set(ref($db, "lobbies/"));
    lobbyRef.set(child($lobbiesRef, id));
    lobbyPlayerRef.set(child($lobbyRef, "players/" + $playerID));
    set($lobbyPlayerRef, {
      name: $UserDisplayName,
      host: false,
    });
  }

  function refreshLobbies() {
    lobbyList = [];
    get(ref($db, "lobbies"))
      .then((snapshot) => {
        let lobbyJson = snapshot.toJSON();
        let lobbyKeys = Object.keys(lobbyJson);
        lobbyKeys.sort(function (a, b) {
          return a == b ? 0 : a > b ? 1 : -1;
        });
        let lobbyNames: string[] = [];
        let playerCounts: number[] = [];
        let passwords: string[] = [];
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
          let lobby: lobbyData = { id: "", name: "", players: 0, pass: "" };
          lobby.id = lobbyKeys[i];
          lobby.name = lobbyNames[i];
          lobby.players = playerCounts[i];
          lobby.pass = passwords[i];
          lobbyList.push(lobby);
        }
        lobbyList = lobbyList;
      })
      .catch((error) => {
        console.log("No Lobbies");
        console.log(error);
      });
  }

  interface lobbyData {
    id: string;
    name: string;
    players: number;
    pass: string;
  }

  refreshLobbies();

  onMount(() => {
    if ($UserDisplayName == "") {
      window.location.href = "/";
    }
  });
</script>

<div class="btn-group flex flex-nowrap absolute ml-10 mt-20 sm:mt-10">
  <button class="btn btn-error p-0 w-1/4">
    <a href="/" class="flex w-full h-full justify-center items-center">✕</a>
  </button>
  <label for="newLobbyModal" class="btn rounded-none gap-2">+ New Lobby</label>
  <button class="btn btn-accent" on:click={refreshLobbies}>Refresh</button>
</div>
<div
  class="flex absolute justify-center text-xl flex-wrap mt-40 sm:mt-20 w-screen"
>
  {#each lobbyList as lobby (lobby.id)}
    <button
      class="btn btn-base-300 w-1/2 mx-2 mb-10"
      on:click={() => {
        joinLobby(lobby.id);
      }}
    >
      <a href="/lobby" class="flex w-full justify-around">
        <div>
          {lobby.name}
        </div>
        <div>
          {lobby.players}
        </div>
      </a>
    </button>
  {/each}
</div>
<input type="checkbox" id="newLobbyModal" class="modal-toggle" />
<label for="newLobbyModal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <label
      for="newLobbyModal"
      class="btn btn-sm btn-circle absolute right-2 top-2"
    >
      ✕
    </label>
    <div class="form-control w-full max-w-xs">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">Lobby Name</span>
      </label>
      <input
        type="text"
        placeholder={lobbyname}
        class="input input-bordered w-full max-w-xs"
        bind:value={lobbyname}
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">Lobby Password</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
        bind:value={lobbypass}
      />
    </div>
    <div class="flex justify-center">
      <button class="btn btn-secondary p-0 w-1/3 mt-4" on:click={createLobby}>
        <a
          href="/lobby"
          class="flex w-full h-full justify-center gap-2 px-4 items-center"
        >
          + Create Lobby
        </a>
      </button>
    </div>
  </label>
</label>

<style>
</style>
