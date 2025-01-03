<script>
  let { activity } = $props(); // Die Aktivität wird als Prop übergeben
</script>

<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
  <div class="card h-100">
    <div class="card-body">
      <h3 class="card-title">{activity.name}</h3>
      <div class="card-text"><strong>Ort:</strong> {activity.location}</div>
      <div class="card-text"><strong>Beschreibung:</strong> {activity.description}</div>
      <a href={`/trips/${activity.trips[0]}`} class="details-link">Trip anzeigen</a>
    </div>
  </div>
</div>


  