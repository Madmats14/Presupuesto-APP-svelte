<script>
import { prevent_default } from "svelte/internal";

    import materialStore from "./storage.js";

    let materials = [];
    
    materialStore.subscribe(items => {
        materials = items;
    });

    function percentage(precio, total) {
        return (precio / total) * 100;
    }

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});

    $: total = materials.reduce((prev, next) => {
        prev += next.price;
        return prev;
    }, 0);
    
</script>

<style>
    table {
        width: 100%;
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
            <tr>
                <td>{material.name}</td>
                <td>{formatter.format(material.price)}</td>
                <td>{material.quantity}</td>
                <td>
                    <i class="far fa-trash-alt"></i></td>
                <td>{percentage(material.price,total).toFixed(1)}</td>
            </tr>    
        {/each}
        <tr>
            <td>Total</td>
            <td colspan="3">{formatter.format(total)}</td>
        </tr>

    <tbody/>
</table>