<script lang="ts">
  import { Card, Deck } from "./util.js";
//   import { initializeApp } from "firebase/app";
//   import { getAnalytics } from "firebase/analytics";

//   const firebaseConfig = {
//     apiKey: "AIzaSyC_hobr42NEOA46_O-YWYSoXfZgQvTIJa0",
//     authDomain: "tabletalkproj.firebaseapp.com",
//     projectId: "tabletalkproj",
//     storageBucket: "tabletalkproj.appspot.com",
//     messagingSenderId: "550808021827",
//     appId: "1:550808021827:web:88c295a1c72ff68b885df6",
//     measurementId: "G-ER3VK8XS20",
//   };

//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

  var testDeck = new Deck(true);
  testDeck.shuffle();
</script>

<div class="titleScreen">
  <div class="title">TableTalk</div>
  <div class="buttons">
    <button class="playButton">Play</button>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap");

  .titleScreen {
    background-color: rgb(12, 171, 199);
    height: 100vh;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 100px;
  }

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
</style>
