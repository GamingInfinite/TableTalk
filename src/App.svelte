<script lang="ts">
  import TitleScreen from "./Components/Menus/TitleScreen.svelte";
  import { UserDisplayName } from "./stores";

  import { initializeApp } from "firebase/app";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    Auth,
    signOut,
    User,
    deleteUser,
  } from "firebase/auth";
  import {
    getDatabase,
    ref,
    set,
    get,
    remove,
    child,
    DatabaseReference,
    Database,
  } from "firebase/database";
  import { getAnalytics } from "firebase/analytics";
  import { onMount } from "svelte";
  import { createPopper } from "@popperjs/core";

  const firebaseConfig = {
    apiKey: "AIzaSyC_hobr42NEOA46_O-YWYSoXfZgQvTIJa0",
    authDomain: "tabletalkproj.firebaseapp.com",
    projectId: "tabletalkproj",
    storageBucket: "tabletalkproj.appspot.com",
    messagingSenderId: "550808021827",
    appId: "1:550808021827:web:88c295a1c72ff68b885df6",
    measurementId: "G-ER3VK8XS20",
  };

  const Menus = [TitleScreen];
  var currentMenu = 0;

  const app = initializeApp(firebaseConfig);

  const database: Database = getDatabase();

  const google: GoogleAuthProvider = new GoogleAuthProvider();

  const auth: Auth = getAuth();

  let player: User;

  let playerID: string;
  let playerAnonStatus: boolean;
  let playerAvatarURL: string;
  let playerRef: DatabaseReference;

  auth.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      player = user;
      playerID = user.uid;
      playerRef = ref(database, "players/" + playerID);
      if (user.isAnonymous == true) {
        set(playerRef, {
          name: "Anon",
        });
        playerAnonStatus = true;
      } else {
        get(child(playerRef, "name")).then((snapshot) => {
          set(playerRef, {
            name: user.displayName,
          });
        });

        playerAnonStatus = false;
      }

      if (playerAvatarURL) {
        playerAvatarURL = user.photoURL;
      }

      get(child(playerRef, "name")).then((snapshot) => {
        UserDisplayName.set(snapshot.val());
      });
    }
  });

  const analytics = getAnalytics(app);

  let accDropShow = false;

  let stubRef: HTMLDivElement;
  let accDropRef: HTMLDivElement;

  let signInBtn: HTMLButtonElement;

  let showSignInModal: boolean = false;

  function toggleSignInModal() {
    showSignInModal = !showSignInModal;
  }

  const toggleAccDrop = () => {
    accState: {
      if (signInBtn) {
        break accState;
      }

      if (accDropShow) {
        accDropShow = false;
      } else {
        accDropShow = true;
        createPopper(stubRef, accDropRef, {
          placement: "bottom-start",
        });
      }
    }
  };

  const logout = () => {
    if (playerAnonStatus) {
      deleteUser(player);
      remove(playerRef);
    }
    signOut(auth)
      .then(() => {
        UserDisplayName.set("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginAnon = () => {
    signInAnonymously(auth);

    toggleSignInModal();
  };

  const loginGoogle = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

    toggleSignInModal();
  };

  var username: string = "";
  UserDisplayName.subscribe((value) => {
    username = value;
  });
</script>

<div class="screen">
  <div id="userStub" bind:this={stubRef} on:click={toggleAccDrop}>
    {#if username != ""}
      {username}
      <div
        id="accDrop"
        class={accDropShow ? "block" : "hidden"}
        bind:this={accDropRef}
      >
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="dropdownbutton" on:click={logout}>Sign Out</a>
      </div>
    {:else}
      <button class="signin" bind:this={signInBtn} on:click={toggleSignInModal}>
        Sign In
      </button>
    {/if}
  </div>
  <svelte:component this={Menus[currentMenu]} />
  {#if showSignInModal}
    <div class="signInModalWrapper">
      <div class="signInModalHeader">
        Sign In
        <span aria-hidden="true" on:click={toggleSignInModal}>&times;</span>
      </div>
      <div class="signInModalContent">
        <!-- svelte-ignore a11y-missing-attribute -->
        <btn class="oauthBtn" on:click={loginGoogle}>
          <img
            class="oauth-icon"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Login With Google
        </btn>
        <btn class="oauthBtn" on:click={loginAnon}>
          <img
            class="oauth-icon"
            alt="Github sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/1/11/Cc-by_new_white.svg"
          />
          Login With Google
        </btn>
      </div>
    </div>
    <div class="preventative-div" />
  {/if}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap");

  .screen {
    background-color: rgb(12, 171, 199);
    height: 100vh;
    text-align: center;
    font-weight: 900;
    font-family: "Roboto", sans-serif;
    font-size: 10vh;
  }

  .hidden {
    display: none;
  }

  .block {
    display: block;
  }

  .signin {
    background-color: rgb(0, 23, 128);
    border: none;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: x-large;
    color: white;
    padding: 1rem;
    border-radius: 20px;
  }

  .signInModalWrapper {
    background-color: white;
    position: absolute;
    top: 5rem;
    left: 30vw;
    font-weight: 200;
    height: 50vh;
    width: 40vw;
    border-radius: 20px;
    z-index: 50;
  }

  .signInModalHeader {
    border-bottom-style: solid;
    border-color: rgb(0, 0, 0);
  }

  .preventative-div {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 40;
  }

  .dropdownbutton {
    background-color: white;
    font-size: medium;
    border-radius: 20px;
    white-space: nowrap;
  }

  .oauthBtn {
    white-space: nowrap;
    font-size: x-large;
    justify-content: center;
    border-style: solid;
    border-radius: 10px;
    padding: 1rem;
  }

  .oauth-icon {
    position: relative;
    top: 0.5rem;
    width: 40px;
  }

  #userStub {
    position: absolute;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: x-large;
    z-index: 1;
    margin-top: 2rem;
    margin-right: 2rem;
    right: 0;
    top: 0;
  }
</style>
