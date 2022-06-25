<script lang="ts">
  import "../app.css";

  import {
    UserDisplayName,
    db,
    auth,
    player,
    playerID,
    playerAnonStatus,
    playerAvatarURL,
    playerRef,
  } from "../stores";

  import {
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    signOut,
    deleteUser,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { ref, set, get, remove, child } from "firebase/database";

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

  const loginAnon = () => {
    signInAnonymously($auth);
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
  };

  const logout = () => {
    if ($playerAnonStatus) {
      deleteUser($player);
      remove($playerRef);
    }

    signOut($auth)
      .then(() => {
        UserDisplayName.set("");
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.href = "/";
  };

  var username = "";
  UserDisplayName.subscribe((value) => {
    username = value;
  });
</script>

<div class="absolute right-0 top-0 mr-8 mt-8">
  {#if username != ""}
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost m-1">{username}</label>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a on:click={logout}>Sign Out</a></li>
      </ul>
    </div>
  {:else}
    <label for="signInModal" class="btn btn-primary">Sign In</label>
    <input type="checkbox" id="signInModal" class="modal-toggle" />
    <label for="signInModal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <label
          for="signInModal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <button class="btn btn-ghost gap-2" on:click={loginGoogle}>
          <svg
            class="inline-block h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Sign-in with Google
        </button>
        <button class="btn btn-ghost gap-2" on:click={loginAnon}>
          <svg
            class="inline-block h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
            />
          </svg>
          Sign-in Anonymously
        </button>
      </label>
    </label>
  {/if}
</div>
<slot />

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
