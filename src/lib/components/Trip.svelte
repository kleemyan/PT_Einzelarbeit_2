<script>
  let { trip } = $props(); // Der Trip wird als Prop übergeben
</script>

<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
  <div class="card h-100">
    <div class="card-body">
      <h3 class="card-title">{trip.title}</h3>
      <div class="card-text">
        <strong>Destination:</strong>
        {trip.destination}
      </div>
      <div class="card-text">
        <strong>Startdatum:</strong>
        {trip.start_date}
      </div>
      <div class="card-text"><strong>Enddatum:</strong> {trip.end_date}</div>
      <!-- Button "Details ansehen" -->
      <a href={`/trips/${trip._id}`} class="btn btn-outline-primary mt-3">
        Details ansehen
      </a>
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
  
</style>
