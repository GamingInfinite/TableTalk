<script>
  import { Card, Deck } from "../../util";
  import { UserDisplayName } from "../../stores";

  var username = "";
  UserDisplayName.subscribe((value) => {
    username = value;
  });

  var testDeck = new Deck(true);
  testDeck.shuffle();
</script>

<div class="title">TableTalk</div>
<div class="buttons">
  <button class="playButton">Play</button>
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

  .disabled {
    opacity: 0.5;
  }
</style>
