<script>
    import Navbar from '../lib/Navbar.svelte';
    import Footer from '../lib/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
        <slot />
    </main>
    <Footer />
</div>
