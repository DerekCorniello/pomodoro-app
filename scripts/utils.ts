const { assert } = require('assert');

class TodoList {
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

// Class for representing a stage
// ptype is a StageType, duration is a number value for minutes
class Stage {
    type: StageType;
    duration: number;

    constructor(ptype: StageType, duration: number) {
        this.type = ptype;
        this.duration = duration;
    }

    toString(): string {
        return `Stage ${StageType[this.type]}, Duration ${this.duration.toString()}`;
    }
}

// Class for representing an entire pomodoro sequence
// inputs a list of 8 Stage types
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

window.doPomodoro = () => {
    console.log("doPomodoro Created")
    new PomodoroSequence().execute();
};
// If we have a login and logout functionality,
// I think this class is just a singleton at that
// point, idk if we need to do anything special with it
class User {
    private username: string;
    private password: string;
    TodoList: TodoList[] | null;
    history: TodoList[] | null;
    customPomodoros: PomodoroSequence[] | null;

    constructor(username: string, password: string, todo: TodoList[] | null = [], history: TodoList[] | null = null, customPomodoros: PomodoroSequence[] | null = null) {
        this.username = username;
        this.validateUsername();
        this.password = password;
        this.validatePassword();
        this.TodoList = todo;
        this.history = history;
        this.customPomodoros = customPomodoros;
    }

    static login(user: User, username: string, password: string) {
        // TODO
        // Connect to db or something idk
    }

    static logout(user: User) {
        // TODO
        // Disconnect from db lol?
    }

    validateUsername() {
        // TODO
        return this.username
    }
    validatePassword() {
        // TODO
        return this.password
    }

}