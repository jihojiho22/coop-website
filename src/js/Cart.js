import EventDispatcher from './EventDispatcher.js';

export const UPDATE = 'updateCart';

export default class Cart extends EventDispatcher {
    /**
     * @param {Inventory} inventory
     */
    constructor (inventory) {
        super();

        this.inventory = inventory;

        /**
         * @type {Object.<string, number>}
         */
        this.items = {};

        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.clear = this.clear.bind(this);
    }

    /**
     * Returns the total price of all the items in the cart.
     * @returns {number}
     */
    get totalPrice () {
        return Object
            .keys(this.items)
            .map(id => this.inventory.get(id).price * this.get(id))
            .reduce((total, price) => total + price, 0);
    }

    /**
     * Returns the total quantity of all the items in the cart.
     * @returns {number}
     */
    get totalQuantity () {
        return Object
            .keys(this.items)
            .map(id => this.get(id).quantity)
            .reduce((total, quantity) => total + quantity, 0);
    }

    /**
     * Adds an item by id to the cart.
     * @param {string} id The id of the item in the inventory.
     * @param {number} quantity The quantity of items to add to the inventory.
     */
    add (id, quantity = 1) {
        const hasItem = this.inventory.has(id);

        if (quantity < 1) {
            throw new Error('Cannot add an item with a quantity less than 1.');
        } else if (hasItem) {
            this.update(id, this.get(id).quantity + quantity);
        } else {
            throw new Error(`Cannot add item with id ${id}. Item does not exist.`);
        }
    }

    /**
     * Gets an item and its quantity from the cart.
     * @param {string} id The id of the item in the inventory.
     * @returns {{item: InventoryItem, quantity: number}}
     */
    get (id) {
        return {
            item: this.inventory.get(id),
            quantity: this.items[id] || 0
        };
    }

    /**
     * Returns all the items and their quantities from the cart.
     * @returns {{item: InventoryItem, quantity: number}[]}
     */
    getAll () {
        return Object
            .keys(this.items)
            //.map(id => this.get(id)) // This is the same as below
            .map(this.get); // This is an optimized version of the above
    }

    /**
     * Updates the quantity of a specific item in the inventory.
     * @param {string} id The id of the item in the inventory.
     * @param {number} quantity The quantity of items to add to the inventory.
     */
    update (id, quantity) {
        if (quantity > 0) {
            this.items[id] = quantity;
        } else {
            this.remove(id);
        }

        this.dispatchEvent(UPDATE, id);
    }

    /**
     * Removes an item from the cart by id.
     * @param {string} id The id of the item in the inventory.
     */
    remove (id) {
        delete this.items[id];

        this.dispatchEvent(UPDATE, id);
    }

    /**
     * Removes all items from the cart.
     */
    clear () {
        this.items = {};

        this.dispatchEvent(UPDATE);
    }
}