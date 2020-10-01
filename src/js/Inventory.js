import EventDispatcher from './EventDispatcher.js';

export const UPDATE = 'updateInventory';

export default class Inventory extends EventDispatcher {
    constructor () {
        super();

        /**
         * @type {InventoryItem[]}
         */
        this.items = [];

        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.getAll = this.getAll.bind(this);
        this.has = this.has.bind(this);
    }

    /**
     * Adds an inventory item to the inventory.
     * @param {InventoryItem} item
     */

    add (item) {
        if(!this.has(item.id)) {
            this.items.push(item);

            this.dispatchEvent(UPDATE, item.id);
        } else {
            throw new Error(`Item with id ${item.id} already exists in inventory.`);
        }
    }

    /**
     * Gets an item from the inventory by id.
     * @param {string} id The id of the item to retrieve.
     * @returns {InventoryItem}
     */
    get (id) {
        return this.items.find(item => item.id === id);
    }

    /**
     * Returns all of the items in the inventory.
     * @returns {InventoryItem[]}
     */
    getAll() {
        return [...this.items];
    }

    /**
     * Returns whether the item with the specified id exists.
     * @param {string} id The item of the item to check for.
     * @returns {boolean}
     */
    has (id) {
        return !!this.get(id);
    }
}