import { UPDATE as UPDATE_CART } from './Cart.js';
import { UPDATE as UPDATE_INVENTORY } from './Inventory.js';
import { CART_ADD, CART_CLEAR, CART_REMOVE } from './View.js';

export default class Controller {
    /**
     * @param {Cart} cart
     * @param {Inventory} inventory
     * @param {View} view
     */
    constructor (cart, inventory, view) {
        this.cart = cart;
        this.inventory = inventory;
        this.view = view;

        this.cart.addEventListener(UPDATE_CART, () => this.view.renderCart(this.cart.getAll(), this.cart.totalPrice, this.cart.totalQuantity));
        this.inventory.addEventListener(UPDATE_INVENTORY, () => this.view.renderInventory(this.inventory.getAll()));

        this.view.addEventListener(CART_ADD, ({ id, quantity }) => this.cart.add(id, quantity));
        this.view.addEventListener(CART_CLEAR, () => this.cart.clear());
        this.view.addEventListener(CART_REMOVE, id => this.cart.remove(id));
    }
}