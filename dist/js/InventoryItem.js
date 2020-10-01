export default class InventoryItem {
    /**
     * @param {string} id The identifier for the item.
     * @param {string} title The name of the item.
     * @param {number} price The price in USD of the item.
     * @param {string} image A path to an image to use for the item.
     * @param {string} description A description of what the item is.
     */
    constructor (id, title, price, image, description) {
        this.id = id.toString();
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
    }
}