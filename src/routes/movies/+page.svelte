<script>
    import Movie from "../../lib/components/Movie.svelte";
    let { data } = $props();
</script>

<div class="container mt-4">
    <!-- Header Section -->
    <div class="row justify-content-between align-items-center bg-dark text-light py-3 rounded">
        <div class="col-md-6 col-sm-12">
            <p class="mb-0">Daten und Bilder generiert mit ChatGPT und DALL-E</p>
        </div>
        <div class="col-md-6 col-sm-12 text-md-end text-sm-start">
            <a href="/movies/create" class="btn btn-primary btn-lg">Add New Movie</a>
        </div>
    </div>
</div>

<div class="container mt-4">
    <!-- Movie Cards Section -->
    <div class="row">
        {#each data.movies as movie}
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm">
                    <!-- Movie Poster -->
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        class="card-img-top rounded-top"
                        style="height: 250px; object-fit: cover;"
                    />
                    <!-- Card Body -->
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-dark">
                            <a href={`/movies/${movie._id}`} class="text-decoration-none text-primary">
                                {movie.title}
                            </a>
                        </h5>
                        <p class="card-text text-secondary mb-1">Jahr: {movie.year}</p>
                        <p class="card-text text-secondary mb-3">Dauer: {movie.length} Minuten</p>
                        <a href={`/movies/${movie._id}`} class="btn btn-outline-primary mt-auto">
                            Details ansehen
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
