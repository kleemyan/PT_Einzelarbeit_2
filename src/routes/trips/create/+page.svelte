<script>
  import { writable } from 'svelte/store';

  let { form } = $props();

  // Daten für den Trip
  let trip = {
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
  };

  // Liste der Aktivitäten als writable-Store
  let activities = writable([]);

  // Neue Aktivität hinzufügen
  function addActivity() {
    activities.update((current) => [...current, { name: "", location: "", description: "" }]);
  }

  // Aktivität löschen
  function removeActivity(index) {
    activities.update((current) => current.filter((_, i) => i !== index));
  }
</script>

<div class="container mt-4">
  <a href="/trips" class="btn btn-link text-light mb-4">Zurück</a>
  <h1 class="mb-4">Trip hinzufügen</h1>

  <form method="POST" action="?/create" class="needs-validation">
    <!-- Trip Details -->
    <div class="mb-3">
      <label for="title" class="form-label">Titel</label>
      <input
        id="title"
        name="title"
        bind:value={trip.title}
        class="form-control"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label for="destination" class="form-label">Destination</label>
      <input
        id="destination"
        name="destination"
        bind:value={trip.destination}
        class="form-control"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label for="start_date" class="form-label">Startdatum</label>
      <input
        id="start_date"
        name="start_date"
        bind:value={trip.start_date}
        class="form-control"
        type="date"
        required
      />
    </div>
    <div class="mb-3">
      <label for="end_date" class="form-label">Enddatum</label>
      <input
        id="end_date"
        name="end_date"
        bind:value={trip.end_date}
        class="form-control"
        type="date"
        required
      />
    </div>

    <!-- Activities Details -->
    <h2 class="mt-4">Aktivitäten hinzufügen</h2>

    {#each $activities as activity, index}
      <div class="activity-group mb-4">
        <div class="mb-3">
          <label for={`activity_name_${index}`} class="form-label">Name</label>
          <input
            id={`activity_name_${index}`}
            name={`activities[${index}][name]`}
            bind:value={activity.name}
            class="form-control"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for={`activity_location_${index}`} class="form-label">Ort</label>
          <input
            id={`activity_location_${index}`}
            name={`activities[${index}][location]`}
            bind:value={activity.location}
            class="form-control"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for={`activity_description_${index}`} class="form-label">Beschreibung</label>
          <textarea
            id={`activity_description_${index}`}
            name={`activities[${index}][description]`}
            bind:value={activity.description}
            class="form-control"
            required
          ></textarea>
        </div>
        <button type="button" class="btn btn-danger" onclick={() => removeActivity(index)}>
          Aktivität löschen
        </button>
      </div>
    {/each}

    <!-- Button Container -->
    <div class="button-container">
      <button type="button" class="btn btn-secondary" onclick={addActivity}>
        Aktivität hinzufügen
      </button>
      <button type="submit" class="btn btn-primary">Trip hinzufügen</button>
    </div>
  </form>

  {#if form?.success}
    <p class="mt-3 text-success">Trip and Activities created successfully!</p>
  {/if}

  {#if form?.error}
    <p class="mt-3 text-danger">{form.error}</p>
  {/if}
</div>

<style>
  .button-container {
    display: flex;
    justify-content: flex-end; /* Buttons rechtsbündig */
    gap: 1rem; /* Abstand zwischen den Buttons */
    margin-top: 1.5rem; /* Abstand nach oben */
  }

  .btn-secondary,
  .btn-primary {
    text-transform: none; /* Verhindert Großbuchstaben */
    margin: 0; /* Entfernt unnötige Standardabstände */
  }
</style>
