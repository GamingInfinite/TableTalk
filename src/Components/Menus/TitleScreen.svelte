<script lang="ts">
  import { Card, Deck } from "../../util";
  import { UserDisplayName, SettingsModal, Screen } from "../../stores";
  import { onMount } from "svelte";

  var username = "";
  UserDisplayName.subscribe((value) => {
    username = value;
    if (username == "") {
      bandaid = "disabled";
    } else {
      bandaid = "";
    }
  });

  var bandaid: string = "disabled";

  let settings = false;

  function toggleSettings() {
    settings = !settings;
    SettingsModal.set(settings);
  }

  SettingsModal.subscribe((value) => {
    settings = value;
  });

  var testDeck = new Deck(true);
  testDeck.shuffle();
</script>

<div class="title">TableTalk</div>
<div class="buttons">
  <button
    class={"bg-emerald-400 text-white active:bg-emerald-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
      bandaid}
    on:click={() => {
      Screen.set(1);
    }}
  >
    Play
  </button>
  <button
    class={"bg-cyan-300 text-white active:bg-cyan-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
      bandaid}
    on:click={toggleSettings}
  >
    Settings
  </button>
</div>

<style>
  .title {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
