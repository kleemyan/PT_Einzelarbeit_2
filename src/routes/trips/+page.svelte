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

<style>
  /* Abstand von der Navbar */
  .title-container {
    padding-top: 4rem; /* Abstand von der Navbar */
    margin-bottom: 2rem; /* Abstand nach unten */
    display: flex;
    align-items: center;
    justify-content: space-between; /* Titel links, Button rechts */
  }

  /* Titel Styling */
  .page-title {
    font-size: 2.5rem; /* Große Schriftgröße */
    font-weight: bold;
    margin: 0; /* Kein zusätzlicher Abstand */
    color: #333; /* Textfarbe */
  }

  /* Add Trip Button Styling */
  .add-trip {
    margin-left: auto; /* Schiebt den Button nach rechts */
  }

  .btn-primary {
    font-size: 1rem;
    font-weight: bold;
  }

  /* Globale Anpassung */
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Abstand zu Trips */
  .row {
    margin-top: 2rem; /* Abstand zu den Buttons */
  }
</style>
