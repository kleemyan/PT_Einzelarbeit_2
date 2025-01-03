<script>
  import Trip from "$lib/components/Trip.svelte";

  // Die Trips werden vom Server geladen
  let { data } = $props();
</script>

<!-- Titel und Add Trip Button -->
<div class="title-container">
  <h1 class="page-title">Meine Trips</h1>
  <div class="add-trip">
    <a href="/trips/create" class="btn btn-primary">Trip hinzufügen</a>
  </div>
</div>

<!-- Trips Übersicht -->
<div class="row">
  {#if data.trips.length > 0}
    {#each data.trips as trip}
      <Trip {trip} />
    {/each}
  {:else}
    <p>Keine Trips gefunden.</p>
  {/if}
</div>

