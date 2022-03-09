<script>
    export let id;
    export let name = "";
    export let price;
    export let quantity;
    import storage from "./storage.js";

    $: mode = id ? "modificar" : "agregar";
    $: canSubmit = price >= 0 && name !== "" && quantity >= 1;

    function submit() {
        if (!canSubmit) {
            return;
        }
        price = '';
        name = '';
        id = undefined;
        quantity = '';
    }

    if (mode === "agregar") {
        materialStorage.add(name, price, quantity);
    }

    function cancel() {
        price = '';
        name = '';
        id = undefined;
        quantity = '';
    }
</script>

<style>
    button {
        margin-left: 20px;
    }

    button:disabled {
        cursor: not-allowed;
    }
</style>

<form on:submit|preventDefault={submit}>
    <fieldset>
        <label for="nameField">Material</label>
        <input bind:value={name} placeholder="..." type="text" id="nameField" />
        <label for="priceField">Precio</label>
        <input bind:value={price} min="0" step="any" placeholder="Precio" type="number" id="priceField" />
        <label for="quantityField">Cantidad</label>
        <input bind:value={quantity} min="1" placeholder="Cantidad" type="number" id="quantityField" />
    </fieldset>
    <button disabled={!canSubmit} class="float-right" type="submit">{mode}</button>
    {#if mode === 'modificar'}
        <button on:click={cancel} class="float-right" type="button">Cancelar</button>
    {/if}
</form>