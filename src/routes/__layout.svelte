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
	signInWithEmailAndPassword
  } from "firebase/auth";
  import { ref, set, get, remove, child } from "firebase/database";

  import { library } from "@fortawesome/fontawesome-svg-core";
  import { faGoogle as fasGoogle } from "@fortawesome/free-brands-svg-icons";
  import { faUser as fasUser } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";

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

  library.add(fasGoogle);
  library.add(fasUser);
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
          <FontAwesomeIcon icon={fasGoogle} />
          Sign-in with Google
        </button>
        <button class="btn btn-ghost gap-2" on:click={loginAnon}>
          <FontAwesomeIcon icon={fasUser} />
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
