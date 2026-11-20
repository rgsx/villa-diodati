<!-- Villa Diodati: Svelte (source.svelte) -->
<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';

  export let name = 'Archangel';
  export let letters = 4;

  const CREW = 5;
  let lit = false;
  let line = '';
  const watches = writable(['ice', 'gale', 'ice']);

  $: gales = $watches.filter((watch) => watch === 'gale').length;
  $: label = lit ? 'Douse the lantern' : 'Light the lantern';

  onMount(() => {
    const timer = setTimeout(() => watches.update((list) => [...list, 'fog']), CREW);
    return () => clearTimeout(timer);
  });

  function toggle() {
    lit = !lit;
  }

  function record() {
    const next = line.trim();
    if (!next) return;
    watches.update((list) => [...list, next]);
    line = '';
  }
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && (lit = false)} />

<section class:lit aria-label={name} data-letters={letters} in:fly={{ y: 12, duration: 240 }}>
  <h2>{name}</h2>
  <p>{gales} gales of {$watches.length} watches — letter {letters} to Mrs Saville</p>

  {#if $watches.length === 0}
    <p class="hint">The pack ice is still in the Arctic seas.</p>
  {:else}
    <ul>
      {#each $watches as watch, index (watch + index)}
        <li class:gale={watch === 'gale'}>{index + 1}. {watch}</li>
      {/each}
    </ul>
  {/if}

  <form on:submit|preventDefault={record}>
    <input bind:value={line} placeholder="Log the watch" />
    <button type="button" on:click={toggle}>{label}</button>
    <button type="submit" disabled={!line}>Record</button>
  </form>

  <slot name="footer" {gales}>
    <small>Walton's letters, bound north, {letters} already sent</small>
  </slot>
</section>

<style>
  section {
    --glow: #b8c4d0;
    border-radius: 4px;
  }

  section.lit {
    box-shadow: 0 0 24px var(--glow);
  }

  li.gale::before {
    content: '⚡';
  }
</style>
