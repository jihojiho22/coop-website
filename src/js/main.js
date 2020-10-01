import Controller from './Controller.js';
import View from './View.js';
import Cart from './Cart.js';
import Inventory from './Inventory.js';
import InventoryItem from './InventoryItem.js';

const inventory = new Inventory();
const cart = new Cart(inventory);
const view = new View();
const controller = new Controller(cart, inventory, view);

inventory.add(new InventoryItem(1, 'redwine', 15.99, 'img/redwine.jpg', 'goooood foooood'));
inventory.add(new InventoryItem(2, 'redwine', 15.99, 'img/redwine.jpg', 'goooood foooood'));
inventory.add(new InventoryItem(3, 'redwine', 15.99, 'img/redwine.jpg', 'goooood foooood'));
inventory.add(new InventoryItem(4, 'redwine', 15.99, 'img/redwine.jpg', 'goooood foooood'));
inventory.add(new InventoryItem(5, 'pizza', 19.99, 'img/pizza.jpg', 'delicious foood'));
inventory.add(new InventoryItem(6, 'redwine', 15.99, 'img/redwine.jpg', 'goooood foooood'));
