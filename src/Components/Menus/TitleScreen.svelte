<script lang="ts">
  import { Card, Deck } from "../../util";
  import { UserDisplayName, Screen, playerRef } from "../../stores";
  import { onMount, tick } from "svelte";
  import { set } from "firebase/database";

  import Fa from "svelte-fa";
  import { faTurnDown } from "@fortawesome/free-solid-svg-icons/index.es";

  var username = "";

  UserDisplayName.subscribe((value) => {
    username = value;
  });

  let nameInput: string;

  let showSettingsModal: boolean = false;

  function toggleSettingsModal() {
    showSettingsModal = !showSettingsModal;
  }

  function changeName(name: string) {
    set($playerRef, {
      name: name,
    });
    UserDisplayName.set(name);
  }

  var testDeck = new Deck(true);
  testDeck.shuffle();
</script>

<div class="title">TableTalk</div>
<div class="buttons">
  <button
    class="btn btn-accent"
    class:disabled={username == ""}
    on:click={() => {
      Screen.set(1);
    }}
  >
    Play
  </button>
  <button
    class="btn btn-secondary"
    class:disabled={username == ""}
    on:click={toggleSettingsModal}
  >
    Settings
  </button>
  {#if showSettingsModal}
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative w-auto my-6 mx-auto max-w-3xl bg-slate-50 rounded-md"
      >
        <div
          class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-4xl"
        >
          Settings
          <button
            class="p-1 ml-auto bg-transparent border-0 text-black opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            on:click={toggleSettingsModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="relative p-6 flex-auto">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder={username}
              class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full inline-flex"
              bind:value={nameInput}
            />
            <button
              class="bg-amber-300 text-white active:bg-amber-400 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 inline-flex"
              type="button"
            >
              <Fa class="inline-flex" icon={faTurnDown} />
              <div
                class="inline-flex"
                on:click={() => {
                  changeName(nameInput);
                }}
              >
                Change Name
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black" />
  {/if}
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
