<script lang="ts">
  import { UserDisplayName, playerRef } from "../stores";
  import { set } from "firebase/database";

  let nameInput: string;
  function changeName(name: string) {
    set($playerRef, {
      name: name,
    });
    UserDisplayName.set(name);
  }

  var username = "";
  UserDisplayName.subscribe((value) => {
    username = value;
  });
</script>

<svelte:head>
  <title>TableTalk</title>
</svelte:head>

<div class="flex justify-center font-black text-6xl mt-40 sm:text-9xl sm:my-20">TableTalk</div>
<div class="flex flex-col justify-center h-96 items-center">
  <div class="flex-row mb-10">
    <a
      class="btn btn-accent"
      class:btn-disabled={username == ""}
      href="/lobbylist"
    >
      Play
    </a>
  </div>
  <div class="flex-row">
    <label
      for="settingsModal"
      class="btn btn-secondary"
      class:btn-disabled={username == ""}
    >
      Settings
    </label>
    <input type="checkbox" id="settingsModal" class="modal-toggle" />
    <label for="settingsModal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <label
          for="settingsModal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <div class="form-control w-full max-w-xs">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder={username}
            class="input input-bordered w-full max-w-xs"
            bind:value={nameInput}
          />
        </div>
        <div class="flex justify-center mt-6">
          <button
            class="btn btn-secondary"
            on:click={() => {
              changeName(nameInput);
            }}
          >
            Change Username
          </button>
        </div>
      </label>
    </label>
  </div>
</div>

<style>
</style>
