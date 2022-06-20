<script lang="ts">
  import { Screen, lobbyRef, lobbyPlayerRef } from "../../stores";
  import { ref, set, get, remove, child } from "firebase/database";

  let players;

  get(child($lobbyRef, "players")).then((snapshot) => {
    let playerJson = snapshot.toJSON();
    let playerKeys = Object.keys(playerJson);

    playerKeys.sort(function (a, b) {
      return a == b ? 0 : a > b ? 1 : -1;
    });

    let playerNames:string[] = []
    let hostBools:boolean[] = []

    for (let i = 0; i < playerKeys.length; i++) {
        const element = playerKeys[i];
        

    }
  });
</script>

<div id="z-10 flex absolute ml-2 mt-2">
  <button
    class="top-0 text-white font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 bg-red-600 active:bg-red-800 ease-linear transition-all duration-150"
    on:click={() => {
      get(child($lobbyPlayerRef, "host")).then((snapshot) => {
        if (snapshot.val()) {
          remove($lobbyRef);
        }
      });
      get(child($lobbyRef, "players")).then((snapshot) => {
        let playersJson = snapshot.toJSON()
        let playerCount = Object.keys(playersJson).length
        if (playerCount == 0) {
          remove($lobbyRef);
        }
      });
      Screen.set(1);
    }}
  >
    &times;
  </button>
</div>
<div class="justify-right" />

<style>
</style>
