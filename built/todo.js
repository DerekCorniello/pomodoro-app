"use strict";
var TodoList = /** @class */ (function () {
    function TodoList(title, items) {
        this.title = title;
        this.items = items;
    }
    return TodoList;
}());
var ListItem = /** @class */ (function () {
    function ListItem(title, dueDate, description) {
        if (dueDate === void 0) { dueDate = null; }
        if (description === void 0) { description = null; }
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
    }
    return ListItem;
}());
