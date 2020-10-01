import EventDispatcher from './EventDispatcher.js';

export const CART_CLEAR = 'cartClear';
export const CART_REMOVE = 'cartRemove';
export const CART_ADD = 'cartAdd';

/**
 * Converts a number to it's dollar value.
 * @param {number} amount The number of dollars
 * @returns {string}
 * @private
 */
const _toDollars = amount => `$${amount.toFixed(2)}`;

export default class View extends EventDispatcher {
    constructor () {
        super();

        this.side = document.querySelector('.side');
        this.sideBar = document.querySelector('.side-bar');
        this.sideBtn = document.querySelectorAll('.nav-btn');
        this.nav = document.querySelector('.fa-bars');
        this.content = document.querySelectorAll('.content');
        this.menu = document.querySelector('.order');
        this.section = document.querySelector('.section');
        this.logo = document.querySelector('.logo');
        this.menuSection = document.querySelector('.menu-section');
        this.cartBtn = document.querySelector('.cart-btn');
        this.closeCart = document.querySelector('.close-cart');
        this.cartOverlay = document.querySelector('.cart-overlay');
        this.cart = document.querySelector('.cart');
        this.cartContent = document.querySelector('.cart-content');
        this.remove = document.querySelector('.remove-item');
        this.cartTotal = document.querySelector('.cart-total');
        this.clearCart = document.querySelector('.clear-cart');
        this.cartQuantity = document.querySelector('.cart-quantity');
        this.productsCenter = document.querySelector('.products-center');
        this.templateProduct = document.getElementById('product');
        this.templateCartItem = document.getElementById('cart-item');

        this.clearCart.addEventListener('click', () => this.dispatchEvent(CART_CLEAR));

        this.closeCart.addEventListener('click', () => {
            this.cartOverlay.classList.remove('transparentBcg');
            this.cart.classList.remove('showCart');
        });

        this.cartBtn.addEventListener('click', () => {
            this.cartOverlay.classList.add('transparentBcg');
            this.cart.classList.add('showCart');
        });

        this.nav.addEventListener('click', () => {
            this.side.classList.toggle('show-sidebar');
        });

        this.sideBar.addEventListener('click', function (e) {
            const id = e.target.dataset.id;

            if (id) {
                this.sideBtn.forEach(btn => {
                    btn.classList.remove('active');
                    e.target.classList.add('active');
                });
            }

            this.content.forEach(item => item.classList.remove('active'));

            const element = document.getElementById(id);

            element.classList.add('active');
            this.section.style.display = 'block';
            this.logo.style.display = 'block';
            this.menuSection.style.display = 'none';
            this.cartBtn.classList.remove('active');

            console.log(id);

        });

        this.menu.addEventListener('click', () => {
            clearSection();
            this.menuSection.classList.add('active');
            this.menuSection.style.display = 'block';
            this.cartBtn.classList.add('active');
        });

        const clearSection = () => {
            this.section.style.display = 'none';
            this.logo.style.display = 'none';
        };
    }

    /**
     * Renders all of the items in the inventory.
     * @param {InventoryItem[]} items The items in the inventory.
     */
    renderInventory (items) {
        const template = this.templateProduct;
        const container = this.productsCenter;
        container.innerHTML = '';

        items.forEach(item => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.product-title').textContent = item.title;
            clone.querySelector('.product-price').textContent = _toDollars(item.price);
            clone.querySelector('.product-img').style.backgroundImage = `url(${item.image})`;
            clone.querySelector('.product').setAttribute('title', item.description);

            const productAddButton = clone.querySelector('.product-add-button');

            productAddButton.addEventListener('click', () => this.dispatchEvent(CART_ADD, {
                id: item.id,
                quantity: 1
            }));

            container.appendChild(clone);
        });
    }

    /**
     * Renders all of the items in the inventory.
     * @param {{item: InventoryItem, quantity: number}[]} items The items in the cart.
     * @param {number} totalPrice The total dollar value of the cart.
     * @param {number} totalQuantity The total number of items in the cart.
     */
    renderCart (items, totalPrice, totalQuantity) {
        const template = this.templateCartItem;
        const container = this.cartContent;
        container.innerHTML = '';

        items.forEach(o => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.cart-item-title').textContent = o.item.title;
            clone.querySelector('.cart-item-price').textContent = _toDollars(o.item.price);
            clone.querySelector('.cart-item-img').style.backgroundImage = `url(${o.item.image})`;
            clone.querySelector('.cart-item-amount').value = o.quantity.toFixed(0);

            const cartRemoveButton = clone.querySelector('.cart-remove-button');

            cartRemoveButton.addEventListener('click', () => this.dispatchEvent(CART_REMOVE, o.item.id));

            container.appendChild(clone);
        });

        this.cartTotal.textContent = totalPrice.toFixed(2);
        this.cartQuantity.textContent = totalQuantity.toFixed(0);
    }
}