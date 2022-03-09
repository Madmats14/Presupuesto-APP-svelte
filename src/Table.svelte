<script>
    import { createEventDispatcher } from "svelte";
    import materialStore from "./storage.js";

    const dispatch = createEventDispatcher();
    let materials = [];
    
    materialStore.subscribe(items => {
        materials = items;
    });

    function edit(id, name, price, quantity) {
        dispatch ("edit", {id, name, price, quantity});
    }

    function percentage(precio, cantidad, total) {
        return ((precio * cantidad)/ total) * 100;
    }

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

    $: total = materials.reduce((prev, next) => {
        prev += next.price;

        return prev;
    }, 0);

    $: totalItems = materials.reduce((prev, next) => {
        prev += next.quantity

        return prev;
    }, 0);
    
</script>

<style>
    table {
        width: 100%;
    }

    tr {
        cursor: pointer;
    }
</style>

<table class="primary">
    <thead>
        <tr>
            <th>Material</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
            <th>%</th>
        </tr>
    </thead>
    <tbody>
        {#each materials as material (material.id)}
            <tr on:click={edit(material.id, material.name, material.price, material.quantity)}>
                <td>{material.name}</td>
                <td>{formatter.format(material.price)}</td>
                <td>{material.quantity}</td>
                <td>
                    <i class="far fa-trash-alt"></i></td>
                <td>{percentage(material.price, material.quantity, total).toFixed(1)}</td>
            </tr>    
        {/each}
        <tr>
            <td>Total</td>
            <td>{formatter.format(total)}</td>
            <td colspan="2">{totalItems}</td>
        </tr>

    <tbody/>
</table>