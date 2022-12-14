import ElementBase from "./ElementBase.class.js";

export default class Group {
    #layers = [];

    constructor() {
        //console.log('Stack Loaded');
    }

    async render() {
        for (let stack of this.#layers) {
            if (stack instanceof ElementBase) {
                await stack.render();
            } else {
                console.error('No able to render this Layer : ', stack);
            }
        }
    }

    child() {
        return this.#layers;
    }

    add(object) {
        let index = this.#layers.push(object) - 1;
        return this.#layers[index];
    }

    update(key, object) {
        this.#layers[key] = object;
    }

    get(index) {
        return this.#layers[index];
    }

    getById(id) {
        let index = this.#layers.findIndex((e) => id === e.id);
        if (index !== -1) {
            return this.#layers[index];
        }
        return false;
    }

    count(object) {
        let count = 0;
        for (let stack of this.#layers) {
            if (stack instanceof object)
                count++;
        }
        return count;
    }

    last(object) {
        let index = null;
        for (let i = this.#layers.length; i >= 0; i--) {
            if (this.#layers[i] instanceof object) {
                index = i;
                break;
            }
        }
        if (index !== null)
            return this.#layers[index];
        else
            return false;
    }

    updateOrCreate(param) {
        let index = this.#layers.findIndex((e) => param.id === e.id);
        if (index === -1) {
            return this.#layers.push(param) - 1;
        } else {
            this.#layers[index] = param;
            return index;
        }
    }

    delete(id) {
        let index = this.#layers.findIndex((e) => id === e.id);
        if (index !== -1) {
            return this.#layers.splice(index, 1);
        }
        return false;
    }

    uniqueId(prefix = '') {
        let r = prefix + (Math.random() + 1).toString(36).substring(2);
        if (this.#layers.findIndex((e) => r === e.id) === -1) {
            return r;
        } else {
            return this.uniqueId(prefix);
        }
    }
}