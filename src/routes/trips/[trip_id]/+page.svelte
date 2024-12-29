<script>
  let {data} = $props(); // Trip-Daten werden vom Server geladen
</script>

<h1>{data.trip.title}</h1>
<p><strong>Destination:</strong> {data.trip.destination}</p>
<p><strong>Startdatum:</strong> {data.trip.start_date}</p>
<p><strong>Enddatum:</strong> {data.trip.end_date}</p>

<h2>Aktivitäten:</h2>
<ul>
  {#if data.trip.activityDetails && data.trip.activityDetails.length > 0}
    {#each data.trip.activityDetails as activity}
      <li>
        <strong>{activity.name}</strong> – {activity.location}
        <p>{activity.description}</p>
      </li>
    {/each}
  {:else}
    <p>Keine Aktivitäten vorhanden.</p>
  {/if}
</ul>

  

