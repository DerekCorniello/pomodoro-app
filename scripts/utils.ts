const { assert } = require('assert');
const sqlite3 = require('sqlite3');
const passwordHash = require('password-hash');
const db = new sqlite3.Database('database/database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users ( 
            userID INTEGER PRIMARY KEY, 
            Username VARCHAR(255) NOT NULL UNIQUE, 
            Password VARCHAR(255) NOT NULL 
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Sessions (
            sessionID INTEGER PRIMARY KEY,
            SessionStartTime DATETIME NOT NULL,
            SessionEndTime DATETIME NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES Users(userID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS TodoList (
            listID INTEGER PRIMARY KEY,
            userID INTEGER NOT NULL,
            ListTitle VARCHAR(255) NOT NULL,
            ListDescription TEXT,
            FOREIGN KEY (userID) REFERENCES Users(userID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS TodoItem (
            itemID INTEGER PRIMARY KEY,
            listID INTEGER NOT NULL,
            TaskTitle VARCHAR(255) NOT NULL,
            TaskDescription TEXT,
            Timestamp DATETIME NOT NULL,
            isActive BOOLEAN NOT NULL,
            FOREIGN KEY (listID) REFERENCES TodoList(listID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS UserInfo (
            userID INTEGER PRIMARY KEY,
            NumberOfSessions INTEGER NOT NULL,
            TotalStudyTime INTEGER NOT NULL,
            FOREIGN KEY (userID) REFERENCES Users(userID)
    )`);

    /*
    Example of getting data from the database
    db.each("SELECT * FROM Users", (err: any, row: any) => {
        if (err) {  
            console.error(err.message);
        }
        console.log(row.userID + ": " + row.Username);
    });
    */
});

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
        db.serialize(() => {
            db.get(`SELECT * FROM Users WHERE Username = ?`, this._username, (err: any, row: any) => {
            if (err) {
                console.error(err.message);
            } else if (row) {
                console.log("User already exists");
            } else {
                var stmt = db.prepare(`INSERT INTO Users (Username, Password) VALUES (?, ?)`);
                stmt.run(this._username, passwordHash.generate(this._password), (err: any) => {
                if (err) {
                    console.error(err.message);
                }
                });
                stmt.finalize();
            }
            });
        });
    }

    // Getters and setters
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        db.serialize(() => {
            var stmt = db.prepare(`UPDATE Users SET Username = ? WHERE Username = ?`);
            stmt.run(value, value, (err: any) => {
                if (err) {
                    console.error(err.message);
                }
            });
            stmt.finalize();
        });
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        db.serialize(() => {
            var stmt = db.prepare(`UPDATE Users SET Password = ? WHERE Username = ?`);
            stmt.run(passwordHash.generate(value), this._username, (err: any) => {
                if (err) {
                    console.error(err.message);
                }
            });
            stmt.finalize();
        });
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

var user = new User("nathan", "1234");



window.doPomodoro = () => {
    console.log("doPomodoro Created");
    new PomodoroSequence().execute();
};