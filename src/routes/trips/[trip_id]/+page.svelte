<script>
  let { data, form } = $props(); // Trip-Daten und Form-Ergebnisse werden vom Server geladen
</script>

<div class="container mt-3">
  <a href="/trips" class="btn btn-primary">Zurück</a>
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
</div>

<div class="container mt-3">
  <h1>Trip anpassen</h1>
  <form class="mt-4" method="POST" action="?/update">
    <input type="hidden" name="_id" value={data.trip._id} />
    <div class="mb-3">
      <label class="form-label" for="title">Titel</label>
      <input name="title" bind:value={data.trip.title} class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="destination">Destination</label>
      <input name="destination" bind:value={data.trip.destination} class="form-control" type="text" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="start_date">Startdatum</label>
      <input name="start_date" bind:value={data.trip.start_date} class="form-control" type="date" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="end_date">Enddatum</label>
      <input name="end_date" bind:value={data.trip.end_date} class="form-control" type="date" />
    </div>
    <button class="btn btn-success">Änderungen speichern</button>
  </form>

  <form method="POST" action="?/delete" style="margin-top: 1rem;">
    <input type="hidden" name="id" value={data.trip._id} />
    <button type="submit" class="btn btn-danger">Trip löschen</button>
  </form>

  {#if form?.success}
    <p class="text-success mt-3">Trip erfolgreich aktualisiert!</p>
  {/if}
</div>
