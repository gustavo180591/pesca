<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import CardProducto from '../lib/CardProducto.svelte';

    let mensaje = "Bienvenido a la Tienda de Pesca";
    let productos = [];
    let error = '';

    // Cargar productos desde el backend al montar el componente
    onMount(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/productos');
            productos = res.data;
        } catch (err) {
            console.error("Error cargando productos:", err);
            error = "No se pudieron cargar los productos. Verifica la conexión con el backend.";
        }
    });

</script>

<div class="container mx-auto p-6">
    <!-- Mensaje de bienvenida -->
    <h1 class="text-3xl font-bold text-center mb-6">{mensaje}</h1>

    <!-- Mostrar error si no se pueden cargar productos -->
    {#if error}
        <p class="text-red-600 text-center">{error}</p>
    {/if}

    <!-- Mostrar los productos en una cuadrícula -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each productos as producto}
            <CardProducto {producto} />
        {:else}
            <p class="text-gray-500 col-span-full text-center">No hay productos disponibles.</p>
        {/each}
    </div>
</div>
