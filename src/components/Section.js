export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;

    }

    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

// renderItems() {
//     this._items.forEach(data => {
//         this._renderer(data, this._container);
//     });
// }