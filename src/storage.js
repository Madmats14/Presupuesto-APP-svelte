import { writable } from "svelte/store";

const materialStore = writable([]);
const key = 'materials';

if (localStorage.getItem(key)) {
    materialStore.set(JSON.parse(localStorage.getItem(key)));
}

const edit = (id, name, price, quantity) => {
    materialStore.update(items => {
        const index = items.findIndex((i) => i.id === id);

        items[index].name = name;
        items[index].price = price;
        items[index].quantity = quantity;

        return items;
    });
}

const add = (name, price, quantity) => {
    materialStore.update((items) => {

        const item = {
            name,
            price,
            quantity,
            id: new Date().getTime()
        }

        return [item,...items];
    });
};

materialStore.subscribe((items) => {
    const jsonString = JSON.stringify(items);
    localStorage.setItem(key, jsonString);
});

export default {
    subscribe: materialStore.subscribe,
    add,
    edit,
}