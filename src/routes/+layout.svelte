<script>
    let { children } = $props();
    import Navbar from '$lib/components/Navbar.svelte';
  </script>


  
<div><Navbar/></div>
  
  <!-- Inhalt der aktuellen Seite -->
  <div class="content pt-5">
    {@render children()}
  </div>
  
