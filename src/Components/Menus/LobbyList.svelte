<script lang="ts">
  import {
    Screen,
    UserDisplayName,
    db,
    playerID,
    lobbiesRef,
    lobbyRef,
    lobbyPlayerRef,
  } from "../../stores";
  import { ref, set, get, remove, child, push } from "firebase/database";

  import Fa from "svelte-fa";
  import {
    faSquarePlus,
    faArrowsRotate,
  } from "@fortawesome/free-solid-svg-icons/index.es";

  let showLobbyCreateModal: boolean = false;

  let lobbyname: string = $UserDisplayName + "'s Lobby";
  let lobbypass: string = "";

  let lobbyList: lobbyData[] = [];

  function toggleLobbyCreateModal() {
    showLobbyCreateModal = !showLobbyCreateModal;
  }

  function createLobby() {
    Screen.set(2);
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
</script>

<div class="z-10 flex absolute ml-2 mt-2">
  <button
    class="text-white font-bold uppercase text-sm px-6 py-3 rounded-l-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 bg-red-600 active:bg-red-800 ease-linear transition-all duration-150"
    on:click={() => {
      Screen.set(0);
    }}
  >
    &times;
  </button>
  <button
    class="text-white font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mb-1 bg-black active:bg-neutral-800 ease-linear transition-all duration-150"
    on:click={toggleLobbyCreateModal}
  >
    New Lobby
  </button>
  <button
    class="text-white font-bold uppercase text-sm px-6 py-3 rounded-r-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-emerald-400 active:bg-emerald-500 ease-linear transition-all duration-150"
    on:click={refreshLobbies}
  >
    <Fa icon={faArrowsRotate} size="lg" />
  </button>
  {#if showLobbyCreateModal}
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative w-auto my-6 mx-auto max-w-3xl bg-slate-50 rounded-md"
      >
        <div
          class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-4xl"
        >
          New Lobby
          <button
            class="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            on:click={toggleLobbyCreateModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="relative p-6 flex-auto">
          <div class="mb-3 pt-0 text-sm text-left">
            <div class="my-2">
              <label for="ln">Lobby Name</label>
              <input
                type="text"
                placeholder={$UserDisplayName + "'s Lobby"}
                name="ln"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full inline-flex"
                bind:value={lobbyname}
              />
            </div>
            <div class="my-2">
              <label for="lp">Lobby Password</label>
              <input
                type="text"
                placeholder="Optional"
                name="lp"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full inline-flex"
                bind:value={lobbypass}
              />
            </div>
            <div class="justify-center flex">
              <button
                class="bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                on:click={createLobby}
              >
                <div class="inline-flex">
                  <Fa icon={faSquarePlus} />
                </div>
                <div class="inline-flex">Submit</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black" />
  {/if}
</div>
<div class="flex justify-center text-xl flex-wrap">
  {#each lobbyList as lobby (lobby.id)}
    <div class="bg-white rounded-2xl w-1/2 flex justify-around mx-2 my-3">
      <div>
        {lobby.name}
      </div>
      <div>
        {lobby.players}
      </div>
    </div>
  {/each}
</div>

<style>
</style>
