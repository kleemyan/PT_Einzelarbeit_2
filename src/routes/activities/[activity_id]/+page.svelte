<script>
  import Activity from "$lib/components/Activity.svelte";

  let { data } = $props(); // Aktivitätsdaten werden vom Server geladen
</script>

<h1>Aktivitätsdetails</h1>
<Activity activity={data.activity} />
