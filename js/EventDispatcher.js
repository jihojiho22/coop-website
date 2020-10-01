export default class EventDispatcher {
    #listeners = new Map();

    /**
     * @param {string} name The name of the event to listen for.
     * @param {function} callback The function to execute when the event is emitted.
     */
    addEventListener (name, callback) {
        if (!this.#listeners.has(name)) {
            this.#listeners.set(name, []);
        }

        const callbacks = this.#listeners.get(name);
        callbacks.push(callback);
    }

    /**
     * @param {string} name The name of the event to stop listening to.
     * @param {function} [callback] If specified, then only that callback will be removed, otherwise all callbacks for
     * the specified event name will be removed.
     */
    removeEventListener (name, callback) {
        if (this.#listeners.has(name)) {
            const callbacks = this.#listeners.get(name);

            if (callback) {
                this.#listeners.set(name, callbacks.filter(x => x !== callback));
            } else {
                this.#listeners.set(name, []);
            }
        }
    }

    /**
     * @param {string} name The name of the event to dispatch.
     * @param {*} [data] Optional data to dispatch along with the event.
     */
    dispatchEvent (name, data) {
        if (this.#listeners.has(name)) {
            const callbacks = this.#listeners.get(name);
            callbacks.forEach(callback => callback.call(null, data));
        }
    }
}