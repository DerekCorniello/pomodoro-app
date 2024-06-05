class TodoList {
    title: string;
    items: ListItem[];

    constructor(title: string, items: ListItem[]) {
        this.title = title;
        this.items = items;
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
