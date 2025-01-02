<script>
  // Hier können Sie weitere Logik hinzufügen
</script>

<div class="container mt-2">
  <div class="row justify-content-center align-items-center vh-100">
    <div class="col-lg-6 col-md-8 col-sm-12 py-4 text-light text-center">
      <h1 class="display-4">Willkommen bei TripPlaner</h1>
      <p class="lead">
        Ihr Werkzeug, um Reisen zu organisieren und Erlebnisse unvergesslich zu machen.
      </p>
      <div class="d-flex justify-content-center gap-3">
        <a href="/trips" class="btn btn-primary btn-lg cta">Meine Trips anzeigen</a>
        <a href="/activities" class="btn btn-secondary btn-lg cta">Meine Aktivitäten anzeigen</a>
      </div>
      <!-- Bild unterhalb der Buttons -->
      <div class="mt-4">
        <img src="/images/Plane.png" alt="Plane" class="img-fluid" />
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    height: 100vh;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #333;
  }

  .cta {
    padding: 10px 20px;
    font-size: 1.25rem;
    font-weight: bold;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .btn-primary.cta {
    background-color: #5757f1;
    color: #fff;
  }

  .btn-primary.cta:hover {
    background-color: #511edd;
  }

  .btn-secondary.cta {
    background-color: #32bf40;
    color: #fff;
  }

  .btn-secondary.cta:hover {
    background-color: #2c9207;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .vh-100 {
    height: 100vh;
  }
</style>

