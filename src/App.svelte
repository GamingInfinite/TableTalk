<script lang="ts">
  import TitleScreen from "./Components/Menus/TitleScreen.svelte";
  import LobbyList from "./Components/Menus/LobbyList.svelte";
  import Lobby from "./Components/Menus/Lobby.svelte";
  import {
    UserDisplayName,
    Screen,
    db,
    auth,
    player,
    playerID,
    playerAnonStatus,
    playerAvatarURL,
    playerRef,
    lobbyPlayerRef,
  } from "./stores";

  import {
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    signOut,
    deleteUser,
  } from "firebase/auth";
  import { ref, set, get, remove, child } from "firebase/database";
  import { getAnalytics } from "firebase/analytics";
  import { onMount } from "svelte";
  import { createPopper } from "@popperjs/core";

  const Menus = [TitleScreen, LobbyList, Lobby];
  var currentMenu = 0;

  Screen.subscribe((value) => {
    currentMenu = value;
  });

  const google: GoogleAuthProvider = new GoogleAuthProvider();

  $auth.onAuthStateChanged((user) => {
    if (user) {
      player.set(user);
      playerID.set(user.uid);
      playerRef.set(ref($db, "players/" + $playerID));
      if (user.isAnonymous == true) {
        set($playerRef, {
          name: "Anon",
        });
        playerAnonStatus.set(true);
      } else {
        get(child(ref($db, "players/"), $playerID)).then((snapshot) => {
          if (!snapshot.child("name").exists()) {
            set($playerRef, {
              name: user.displayName,
            });
            UserDisplayName.set(user.displayName);
          }
        });

        playerAnonStatus.set(false);
      }

      if (playerAvatarURL) {
        playerAvatarURL.set(user.photoURL);
      }

      get(child($playerRef, "name")).then((snapshot) => {
        if (!(snapshot.val() == null)) {
          UserDisplayName.set(snapshot.val());
        }
      });
    }
  });

  // const analytics = getAnalytics(app);

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
    if ($playerAnonStatus) {
      deleteUser($player);
      remove($playerRef);
    }

    if ($Screen != 0) {
      Screen.set(0);
    }

    signOut($auth)
      .then(() => {
        UserDisplayName.set("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginAnon = () => {
    signInAnonymously($auth);

    toggleSignInModal();
  };

  const loginGoogle = () => {
    signInWithPopup($auth, google)
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
        class="bg-purple-500  text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 {accDropShow
          ? 'block'
          : 'hidden'}"
        bind:this={accDropRef}
      >
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white"
          on:click={logout}
        >
          Sign Out
        </a>
      </div>
    {:else}
      <button
        class="btn btn-primary"
        bind:this={signInBtn}
        on:click={toggleSignInModal}
      >
        Sign In
      </button>
    {/if}
  </div>
  <svelte:component this={Menus[currentMenu]} />
  {#if showSignInModal}
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative w-auto my-6 mx-auto max-w-3xl bg-slate-50 rounded-md"
      >
        <div
          class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-4xl"
        >
          Sign In
          <button
            class="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            on:click={toggleSignInModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="relative p-6 flex-auto">
          <!-- svelte-ignore a11y-missing-attribute -->
          <button
            class="text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-slate-50 active:bg-slate-200 ease-linear transition-all duration-150"
            on:click={loginGoogle}
          >
            <img
              class="oauth-icon inline-flex w-24"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            <div class="inline-flex">Login With Google</div>
          </button>
          <button
            class="text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-slate-50 active:bg-slate-200 ease-linear transition-all duration-150"
            on:click={loginAnon}
          >
            <img
              class="oauth-icon inline-flex 2-24"
              alt="Anon sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/1/11/Cc-by_new_white.svg"
            />
            <div class="inline-flex">Anonymous Login</div>
          </button>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black" />
  {/if}
</div>

<svelte:window
  on:beforeunload={() => {
    if ($playerAnonStatus) {
      deleteUser($player);
      remove($playerRef);
      signOut($auth)
        .then(() => {
          UserDisplayName.set("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }}
/>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap");

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .screen {
    height: 100vh;
    text-align: center;
    font-weight: 900;
    font-family: "Roboto", sans-serif;
    font-size: 10vh;
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
