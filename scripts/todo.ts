import assert from 'assert';

export class TodoList {
    title: string;
    items: ListItem[];

    constructor(title: string, items: ListItem[]) {
        this.title = title;
        this.items = items;
    }

    private deleteAt(index: number) {
        assert(index >= 0 && index < this.items.length, "Index out of Range!");
        return this.items.filter((_, i) => i !== index);
    }

    addItem(item: ListItem) {
        this.items.push(item);
    }

    deleteItemAtIndex(index: number) {
        this.deleteAt(index)
    }

    deleteItemAtName(name: string) {
        this.deleteAt(this.items.findIndex(item => item.title === name));
    }
}

class ListItem {
    title: string;
    dueDate: Date | null;
    description: string | null;

    constructor(title: string, dueDate: Date | null = null, description: string | null = null) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
    }
}
