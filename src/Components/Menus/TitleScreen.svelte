<script lang="ts">
  import { Card, Deck } from "../../util";
  import { UserDisplayName, SettingsModal } from "../../stores";
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
  <button class={"playButton " + bandaid}>Play</button>
  <br />
  <button class={"settings " + bandaid} on:click={toggleSettings}>
    Settings
  </button>
</div>

<style>
  .title {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }

  .playButton {
    background-color: green;
    border: none;
    text-align: center;
    width: 20vw;
    font-family: "Roboto", sans-serif;
    font-size: 50px;
    color: black;
    border-radius: 20px;
  }

  .settings {
    background-color: blue;
    border: none;
    text-align: center;
    width: 20vw;
    font-family: "Roboto", sans-serif;
    font-size: 50px;
    color: black;
    border-radius: 20px;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
