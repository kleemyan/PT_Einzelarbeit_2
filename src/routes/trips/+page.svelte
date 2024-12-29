<script>
  import Trip from "$lib/components/Trip.svelte";

  // Die Trips werden vom Server geladen
  let { data } = $props();
</script>

<h1>Meine Trips</h1>
<div class="row">
  {#if data.trips.length > 0}
    {#each data.trips as trip}
      <Trip {trip} />
    {/each}
  {:else}
    <p>Keine Trips gefunden.</p>
  {/if}
</div>

