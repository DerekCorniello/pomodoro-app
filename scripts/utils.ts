const { assert } = require('assert');

class TodoList {
    private _title: string;
    private _items: ListItem[];

    constructor(title: string, items: ListItem[]) {
        this._title = title;
        this._items = items;
    }

    private deleteAt(index: number): void {
        assert(index >= 0 && index < this._items.length, "Index out of Range!");
        this._items = this._items.filter((_, i) => i !== index);
    }

    // Getters and setters
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get items(): ListItem[] {
        return this._items;
    }

    set items(value: ListItem[]) {
        this._items = value;
    }

    addItem(item: ListItem): void {
        this._items.push(item);
    }

    deleteItemAtIndex(index: number): void {
        this.deleteAt(index);
    }

    deleteItemAtName(name: string): void {
        this.deleteAt(this._items.findIndex(item => item.title === name));
    }
}

class ListItem {
    private _title: string;
    private _dueDate: Date | null;
    private _description: string | null;

    constructor(title: string, dueDate: Date | null = null, description: string | null = null) {
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
    }

    // Getters and setters
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get dueDate(): Date | null {
        return this._dueDate;
    }

    set dueDate(value: Date | null) {
        this._dueDate = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }
}

enum StageType {
    WorkOne,
    BreakOne,
    WorkTwo,
    BreakTwo,
    WorkThree,
    BreakThree,
    WorkFour,
    BreakFour
};

class Stage {
    private _type: StageType;
    private _duration: number;

    constructor(type: StageType, duration: number) {
        this._type = type;
        this._duration = duration;
    }

    // Getters
    get type(): StageType {
        return this._type;
    }

    get duration(): number {
        return this._duration;
    }

    toString(): string {
        return `Stage ${StageType[this._type]}, Duration ${this._duration.toString()}`;
    }
}

class PomodoroSequence {
    private sequence: Stage[] = [];

    constructor(sequence: Stage[] | null = null) {
        this.setSequence(sequence);
    }

    // Set the sequence, check to ensure it is valid as well
    setSequence(sequence: Stage[] | null): void {
        if (sequence && sequence.length === 8) {
            this.sequence = sequence;
        } else {
            // Use the default pomodoro sequence
            this.sequence = [
                new Stage(StageType.WorkOne, 25),
                new Stage(StageType.BreakOne, 5),
                new Stage(StageType.WorkTwo, 25),
                new Stage(StageType.BreakTwo, 5),
                new Stage(StageType.WorkThree, 25),
                new Stage(StageType.BreakThree, 5),
                new Stage(StageType.WorkFour, 25),
                new Stage(StageType.BreakFour, 20),
            ];
        }
    }

    // Get the sequence list
    getSequence(): Stage[] {
        return this.sequence;
    }

    // Execute the sequence
    execute(): void {
        // Create a copy of the sequence so data can be retained
        const sequence = this.getSequence().slice();

        // Create a recursive function that will manage the pomodoro
        const runStage = (seq: Stage[]): void => {
            // Base case, if there are no more stages, end
            if (seq.length === 0) {
                console.log("Pomodoro completed!");
                return;
            }

            // Takes the first element, get a bunch of its info
            const stage = seq.shift()!;
            const stageType = StageType[stage.type];

            console.log(`Starting ${stageType} for ${stage.duration} minutes.`);

            setTimeout(() => {
                console.log(`Completed ${stageType}.`);
                runStage(seq); // Continue with the next stage
            }, stage.duration * 60000); // Convert minutes to milliseconds
        };

        runStage(sequence);
    }
}

class User {
    private _username: string;
    private _password: string;
    private _todoList: TodoList[] | null;
    private _history: TodoList[] | null;
    private _customPomodoros: PomodoroSequence[] | null;

    constructor(username: string, password: string, todoList: TodoList[] | null = null, history: TodoList[] | null = null, customPomodoros: PomodoroSequence[] | null = null) {
        this._username = username;
        this._password = password;
        this._todoList = todoList;
        this._history = history;
        this._customPomodoros = customPomodoros;
    }

    // Getters and setters
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get todoList(): TodoList[] | null {
        return this._todoList;
    }

    set todoList(value: TodoList[] | null) {
        this._todoList = value;
    }

    get history(): TodoList[] | null {
        return this._history;
    }

    set history(value: TodoList[] | null) {
        this._history = value;
    }

    get customPomodoros(): PomodoroSequence[] | null {
        return this._customPomodoros;
    }

    set customPomodoros(value: PomodoroSequence[] | null) {
        this._customPomodoros = value;
    }

    static login(user: User, username: string, password: string): void {
        // TODO: Implement login logic
    }

    static logout(user: User): void {
        // TODO: Implement logout logic
    }

    validateUsername(): string {
        // TODO: Implement username validation logic
        return this._username;
    }

    validatePassword(): string {
        // TODO: Implement password validation logic
        return this._password;
    }
}


window.doPomodoro = () => {
    console.log("doPomodoro Created")
    new PomodoroSequence().execute();
};

