<script lang="ts">
  import {
    UserDisplayName,
    db,
    lobbiesRef,
    lobbyRef,
    lobbyPlayerRef,
    playerID,
  } from "../stores";

  import { get, ref, push, set, child, DataSnapshot } from "firebase/database";

  import { onMount } from "svelte";

  let lobbyname: string = $UserDisplayName + "'s Lobby";
  let lobbypass: string = "";
  let lobbyList: lobbyData[] = [];

  let queueJoin;

  lobbiesRef.set(ref($db, "lobbies/"));

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

  function joinLobby(id: string, host: boolean = false) {
    lobbyRef.set(child($lobbiesRef, id));
    lobbyPlayerRef.set(child($lobbyRef, "players/" + $playerID));
    set($lobbyPlayerRef, {
      name: $UserDisplayName,
      host: host,
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
          let playerCount = 0;
          if (lobbyJson[element].players) {
            playerCount = Object.keys(lobbyJson[element].players).length;
            let players = Object.keys(lobbyJson[element].players);
            if (players.includes($playerID)) {
              let host: any;
              get(
                child(
                  $lobbiesRef,
                  lobbyKeys[i] + "/players/" + players[i] + "/host"
                )
              ).then((snapshot) => {
                host = snapshot.val();
                joinLobby(lobbyKeys[i], host);
                queueJoin = lobbyKeys[i];
              });
            }
          }
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
    if (queueJoin) {
      console.log(queueJoin);
      document.getElementById(queueJoin).click();
    }
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
    <a href="/" class="flex w-full h-full justify-center items-center">
      <svg
        class="inline-block h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"
        />
      </svg>
    </a>
  </button>
  <label for="newLobbyModal" class="btn rounded-none gap-2">
    <svg
      class="inline-block h-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        fill="currentColor"
        d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
      />
    </svg>
    New Lobby
  </label>
  <button class="btn btn-accent" on:click={refreshLobbies}>
    <svg
      class="inline-block h-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        fill="currentColor"
        d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
      />
    </svg>
  </button>
</div>
<div
  class="flex absolute justify-center text-xl flex-wrap mt-40 sm:mt-20 w-screen"
>
  {#each lobbyList as lobby (lobby.id)}
    <button
      class="btn btn-base-300 w-1/2 mx-2 mb-10 p-0"
      on:click={() => {
        joinLobby(lobby.id);
      }}
    >
      <a
        href="/lobby"
        id={lobby.id}
        class="flex h-full w-full justify-around items-center"
      >
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
          <svg
            class="inline-block h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              fill="currentColor"
              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
            />
          </svg>
          Create Lobby
        </a>
      </button>
    </div>
  </label>
</label>

<style>
</style>
