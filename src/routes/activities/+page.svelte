<script>
  import Activity from "$lib/components/Activity.svelte";
  let { data } = $props();
</script>

<!-- Titel -->
<div class="title-container">
  <h1 class="page-title">Meine Aktivitäten</h1>
</div>

<!-- Aktivitäten Übersicht -->
<div class="row">
  {#if data.activities.length > 0}
    {#each data.activities as activity}
      <Activity {activity} />
    {/each}
  {:else}
    <p>Keine Aktivitäten gefunden.</p>
  {/if}
</div>

<style>
  /* Abstand von der Navbar */
  .title-container {
    padding-top: 4rem; /* Abstand von der Navbar */
    margin-bottom: 2rem; /* Abstand nach unten */
  }

  /* Titel Styling */
  .page-title {
    font-size: 2.5rem; /* Große Schriftgröße */
    font-weight: bold;
    margin: 0; /* Kein zusätzlicher Abstand */
    color: #333; /* Textfarbe */
  }

  /* Globale Anpassung */
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Abstand zu Aktivitäten */
  .row {
    margin-top: 2rem; /* Abstand zu den Aktivitäten */
  }
</style>

  