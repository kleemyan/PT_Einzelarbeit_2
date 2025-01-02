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

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 16px;
    text-align: center;
  }

  .card-title {
    margin-bottom: 8px;
    font-size: 1.25rem;
    color: #333;
  }

  .card-text {
    margin-bottom: 4px;
    font-size: 0.9rem;
    color: #555;
  }

  .details-link {
    display: inline-block;
    margin-top: 8px;
    color: #0070f3;
    text-decoration: underline;
  }

  .details-link:hover {
    text-decoration: none;
  }
</style>

  