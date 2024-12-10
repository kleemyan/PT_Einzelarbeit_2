<script>
    let { data } = $props();
</script>

<div class="container mt-5">
    <!-- Back Link -->
    <div class="mb-4">
        <a href="/movies" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left"></i> Back to Movies
        </a>
    </div>

    <!-- Movie Title -->
    <h1 class="text-primary mb-4">{data.movie.title}</h1>

    <div class="row align-items-center">
        <!-- Movie Poster -->
        <div class="col-md-5">
            <div class="shadow-lg rounded">
                <img
                    src={data.movie.poster}
                    alt={data.movie.title}
                    class="img-fluid rounded"
                    style="max-height: 400px; object-fit: cover;"
                />
            </div>
        </div>

        <!-- Movie Details -->
        <div class="col-md-7">
            <div class="bg-light p-4 rounded shadow-sm">
                <p class="mb-2">
                    <strong>Jahr:</strong> {data.movie.year}
                </p>
                <p class="mb-2">
                    <strong>Dauer:</strong> {data.movie.length} Minuten
                </p>
                <p class="mb-3">
                    <strong>Cast:</strong>
                </p>
                <ul class="list-group">
                    {#each data.movie.actors as actor}
                        <li class="list-group-item">
                            <i class="bi bi-person"></i> {actor}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>

