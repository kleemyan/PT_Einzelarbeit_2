<script>
  let activities = []; // Liste der hinzugefügten Aktivitäten

  // Füge eine neue Aktivität hinzu
  function addActivity() {
    activities = [...activities, { name: "", location: "", description: "" }];
  }

  // Entferne eine Aktivität
  function removeActivity(index) {
    activities = activities.filter((_, i) => i !== index);
  }
</script>

<h1>Neuen Trip erstellen</h1>
<form method="POST">
  <!-- Trip-Daten -->
  <label for="title">Titel:</label>
  <input id="title" name="title" type="text" required />

  <label for="destination">Destination:</label>
  <input id="destination" name="destination" type="text" required />

  <label for="start_date">Startdatum:</label>
  <input id="start_date" name="start_date" type="date" required />

  <label for="end_date">Enddatum:</label>
  <input id="end_date" name="end_date" type="date" required />

  <h2>Aktivitäten hinzufügen</h2>
  {#each activities as activity, index}
    <fieldset>
      <legend>Aktivität {index + 1}</legend>
      <label for={`activity_name_${index}`}>Name:</label>
      <input id={`activity_name_${index}`} name="activity_name" bind:value={activity.name} required />

      <label for={`activity_location_${index}`}>Ort:</label>
      <input id={`activity_location_${index}`} name="activity_location" bind:value={activity.location} required />

      <label for={`activity_description_${index}`}>Beschreibung:</label>
      <textarea id={`activity_description_${index}`} name="activity_description" bind:value={activity.description}></textarea>

      <button type="button" on:click={() => removeActivity(index)}>Entfernen</button>
    </fieldset>
  {/each}

  <button type="button" on:click={addActivity}>Aktivität hinzufügen</button>
  <button type="submit">Trip erstellen</button>
</form>

  
