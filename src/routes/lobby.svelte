<script lang="ts">
  import {
    UserDisplayName,
    lobbyRef,
    lobbyPlayerRef,
    playerID,
    lobbyPlayerList,
  } from "../stores";

  import {
    get,
    child,
    remove,
    onChildRemoved,
    onChildAdded,
    DatabaseReference,
  } from "firebase/database";

  import { onMount } from "svelte";

  let iamhost = false;

  let players: PlayerData[] = [];

  let playersRef: DatabaseReference;

  onMount(() => {
    if ($UserDisplayName == "") {
      window.location.href = "/";
    }

    playersRef = child($lobbyRef, "players");
    onChildRemoved($lobbyRef, (snapshot) => {
      remove($lobbyRef);
    });

    onChildAdded(playersRef, (snapshot) => {
      refreshPlayerList();
    });

    onChildRemoved(playersRef, (snapshot) => {
      refreshPlayerList();
    });

    refreshPlayerList();
  });

  let closeButton;
  function closeRoom() {
    remove($lobbyRef);
  }

  let leaveButton: HTMLAnchorElement;
  function leaveRoom() {
    remove($lobbyPlayerRef);
    leaveButton.click();
  }

  function refreshPlayerList() {
    get(playersRef)
      .then((snapshot) => {
        players = [];
        let playersJson = snapshot.toJSON();
        let playerKeys = Object.keys(playersJson);
        playerKeys.sort(function (a, b) {
          return a == b ? 0 : a > b ? 1 : -1;
        });
        let playerNames = [];
        let hosting = [];
        for (let i = 0; i < playerKeys.length; i++) {
          const element = playerKeys[i];
          let playerName = playersJson[element].name;
          playerNames.push(playerName);
          let isPlayerHost = playersJson[element].host;
          if (element == $playerID) {
            iamhost = isPlayerHost;
          }
          hosting.push(isPlayerHost);
        }
        for (let i = 0; i < playerKeys.length; i++) {
          let player: PlayerData = { id: "", name: "", host: false };
          player.id = playerKeys[i];
          player.name = playerNames[i];
          player.host = hosting[i];
          players.push(player);
        }
        lobbyPlayerList.set(players);
      })
      .catch((err) => {
        console.log("No Players");
      });
  }

  interface PlayerData {
    id: string;
    name: string;
    host: boolean;
  }
</script>

<div class="btn-group flex flex-nowrap absolute ml-10 mt-10">
  <button class="btn btn-error" on:click={leaveRoom}>
    <a
      href="/lobbylist"
      bind:this={leaveButton}
      class="flex w-full h-full justify-center items-center"
    >
      <svg
        class="h-4 inline-block"
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
</div>
<div class="flex flex-row">
  <div class="flex flex-col w-2/3" />
  <div class="flex flex-col w-1/4">
    <div class="flex flex-row h-36" />
    <div class="flex flex-row bg-base-300 justify-center rounded-t-lg">
      Player List
    </div>
    <div class="flex flex-row bg-base-200 justify-center rounded-b-lg">
      <div class="flex flex-col">
        {#each players as player (player.id)}
          <div class="flex flex-row justify-center items-center gap-2">
            {player.name}
            {#if player.host}
              <svg
                class="h-4 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                  fill="currentColor"
                  d="M576 136c0 22.09-17.91 40-40 40c-.248 0-.4551-.1266-.7031-.1305l-50.52 277.9C482 468.9 468.8 480 453.3 480H122.7c-15.46 0-28.72-11.06-31.48-26.27L40.71 175.9C40.46 175.9 40.25 176 39.1 176c-22.09 0-40-17.91-40-40S17.91 96 39.1 96s40 17.91 40 40c0 8.998-3.521 16.89-8.537 23.57l89.63 71.7c15.91 12.73 39.5 7.544 48.61-10.68l57.6-115.2C255.1 98.34 247.1 86.34 247.1 72C247.1 49.91 265.9 32 288 32s39.1 17.91 39.1 40c0 14.34-7.963 26.34-19.3 33.4l57.6 115.2c9.111 18.22 32.71 23.4 48.61 10.68l89.63-71.7C499.5 152.9 496 144.1 496 136C496 113.9 513.9 96 536 96S576 113.9 576 136z"
                />
              </svg>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <div class="flex flex-row mt-4 justify-center">
      <button
        class="btn btn-primary p-0"
        class:btn-disabled={!iamhost}
        on:click={closeRoom}
      >
        <a
          href="/lobbylist"
          class="flex w-full h-full items-center mx-4"
          bind:this={closeButton}
        >
          Close Room
        </a>
      </button>
    </div>
  </div>
</div>

<svelte:window
  on:beforeunload={() => {
    window.location.href = "/";
  }}
/>
