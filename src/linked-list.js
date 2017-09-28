const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        if(!this.length) {
            this._head = new Node(data, null, null);
            this._tail = new Node(data, null, this._head);
            this._head.prev = this._tail;
        }else if(this.length == 1) {
            this._tail.data = data;
        } else {
            var addNode = this._tail;
            this._tail = new Node(data, null, addNode)
            addNode.prev = this._tail;
        }
        this.length += 1;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var current = this._head;
        for(var i = 1; i <= index; i++) current = current.prev;
        return current.data;
    }

    insertAt(index, data) {
        var current = this._head;
        /* Ищем позицию вставляемого элемента */
        for(var i = 1; i <= index; i++) current = current.prev;
        var addNode = new Node(data, current, current.next);
        /* Переопределяем ссылки соседних элементов */
        if(current.next) current.next.prev = addNode;
        current.next = addNode;

        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        for (var key in this._head) {
            if (this._head.hasOwnProperty(key)) {
                this._head[key] = null;
            }
        }
        for (var key in this._tail) {
            if (this._tail.hasOwnProperty(key)) {
                this._tail[key] = null;
            }
        }

        this.length = 0;

        return this;
    }

    deleteAt(index) {
        var current = this._head;
        /* Ищем позицию удаляемого элемента */
        for(var i = 1; i <= index; i++) current = current.prev;

        current.prev.next = current.next;
        if(current.next) current.next.prev = current.prev;

        return this;
    }

    reverse() {
        var current = this._head;
        this._head = this._tail;
        this._tail = current;
        current = this._head;
        for(var i = 0; i < this.length; i++) {
            var inter = current.prev;
            current.prev = current.next;
            current.next = inter;
            current = current.prev;
        }

        return this;
    }

    indexOf(data) {
        var current = this._head;
        /* Перебираем ноды */
        for(var i = 0; i < this.length; i++) {
            if(current.data == data) return i;
            current = current.prev;
        }
        return -1;
    }
}

module.exports = LinkedList;
