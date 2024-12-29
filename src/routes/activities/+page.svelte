<script>
    import Activity from "$lib/components/Activity.svelte";
    let {data} = $props();
  </script>
  
  <h1>Meine Aktivitäten</h1>
  <div class="row">
    {#if data.activities.length > 0}
      {#each data.activities as activity}
        <Activity {activity} />
      {/each}
    {:else}
      <p>Keine Aktivitäten gefunden.</p>
    {/if}
  </div>
  