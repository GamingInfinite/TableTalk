<script lang="ts">
  import { UserDisplayName, lobbyRef } from "../stores";

  import {child} from "firebase/database"

  import { onMount } from "svelte";

  import {
    faArrowsRotate as refresh,
    faX as exit,
    faPlus as add,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";

  let players: PlayerData[] = [];

  let playersRef = child($lobbyRef, "players");

  onMount(() => {
    if ($UserDisplayName == "") {
      window.location.href = "/";
    }
  });

  interface PlayerData {
    id: string;
    name: string;
    host: boolean;
  }
</script>

<div class="btn-group flex flex-nowrap absolute ml-10 mt-10">
  <button class="btn btn-error">
    <a href="/lobbylist" class="flex w-full h-full justify-center items-center">
      <FontAwesomeIcon icon={exit} />
    </a>
  </button>
</div>
<div class="flex flex-row">
  <div class="flex flex-col w-1/2" />
  <div class="flex flex-col w-1/2 text-center">
    <div>Player List</div>
    <div>
      {#each players as player (player.id)}
        {player}
      {/each}
    </div>
  </div>
</div>
