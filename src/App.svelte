<script>
	import Table from "./Table.svelte";
	import Form from "./Form.svelte";
	
	let id;
	let name;
	let price;
	let quantity;
	function edit(event) {
		({ id, name, price, quantity } = event.detail);
		console.log(event,'event');
	}
</script>

<style>
	main {
		flex: 1;
		align-content: center;
		justify-content: center;
		width: 80%;
		margin: 0 auto;
	}
</style>

<main>
	<h1>MyPresupuesto</h1>
	
	<Form bind:id bind:name bind:price bind:quantity />

	<Table on:edit={edit}/>

</main>