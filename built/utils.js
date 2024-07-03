"use strict";
const { assert } = require('assert');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database/database.db');
db.serialize(() => {
    db.run(`CREATE TABLE Users ( 
            userID INT AUTO_INCREMENT PRIMARY KEY, 
            Username VARCHAR(255) NOT NULL, 
            Password VARCHAR(255) NOT NULL 
    )`);
    db.run(`INSERT INTO Users (Username, Password) VALUES ('admin', 'admin')`);
    db.run(`CREATE TABLE Sessions (
            sessionID INT AUTO_INCREMENT PRIMARY KEY,
            SessionStartTime DATETIME NOT NULL,
            SessionEndTime DATETIME NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES Users(userID)
    )`);
});
class TodoList {
    constructor(title, items) {
        this._title = title;
        this._items = items;
    }
    deleteAt(index) {
        assert(index >= 0 && index < this._items.length, "Index out of Range!");
        this._items = this._items.filter((_, i) => i !== index);
    }
    // Getters and setters
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    addItem(item) {
        this._items.push(item);
    }
    deleteItemAtIndex(index) {
        this.deleteAt(index);
    }
    deleteItemAtName(name) {
        this.deleteAt(this._items.findIndex(item => item.title === name));
    }
}
class ListItem {
    constructor(title, dueDate = null, description = null) {
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
    }
    // Getters and setters
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(value) {
        this._dueDate = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
var StageType;
(function (StageType) {
    StageType[StageType["WorkOne"] = 0] = "WorkOne";
    StageType[StageType["BreakOne"] = 1] = "BreakOne";
    StageType[StageType["WorkTwo"] = 2] = "WorkTwo";
    StageType[StageType["BreakTwo"] = 3] = "BreakTwo";
    StageType[StageType["WorkThree"] = 4] = "WorkThree";
    StageType[StageType["BreakThree"] = 5] = "BreakThree";
    StageType[StageType["WorkFour"] = 6] = "WorkFour";
    StageType[StageType["BreakFour"] = 7] = "BreakFour";
})(StageType || (StageType = {}));
;
class Stage {
    constructor(type, duration) {
        this._type = type;
        this._duration = duration;
    }
    // Getters
    get type() {
        return this._type;
    }
    get duration() {
        return this._duration;
    }
    toString() {
        return `Stage ${StageType[this._type]}, Duration ${this._duration.toString()}`;
    }
}
class PomodoroSequence {
    constructor(sequence = null) {
        this.sequence = [];
        this.setSequence(sequence);
    }
    // Set the sequence, check to ensure it is valid as well
    setSequence(sequence) {
        if (sequence && sequence.length === 8) {
            this.sequence = sequence;
        }
        else {
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
    getSequence() {
        return this.sequence;
    }
    // Execute the sequence
    execute() {
        // Create a copy of the sequence so data can be retained
        const sequence = this.getSequence().slice();
        // Create a recursive function that will manage the pomodoro
        const runStage = (seq) => {
            // Base case, if there are no more stages, end
            if (seq.length === 0) {
                console.log("Pomodoro completed!");
                return;
            }
            // Takes the first element, get a bunch of its info
            const stage = seq.shift();
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
    constructor(username, password, todoList = null, history = null, customPomodoros = null) {
        this._username = username;
        this._password = password;
        this._todoList = todoList;
        this._history = history;
        this._customPomodoros = customPomodoros;
    }
    // Getters and setters
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get todoList() {
        return this._todoList;
    }
    set todoList(value) {
        this._todoList = value;
    }
    get history() {
        return this._history;
    }
    set history(value) {
        this._history = value;
    }
    get customPomodoros() {
        return this._customPomodoros;
    }
    set customPomodoros(value) {
        this._customPomodoros = value;
    }
    static login(user, username, password) {
        // TODO: Implement login logic
    }
    static logout(user) {
        // TODO: Implement logout logic
    }
    validateUsername() {
        // TODO: Implement username validation logic
        return this._username;
    }
    validatePassword() {
        // TODO: Implement password validation logic
        return this._password;
    }
}
window.doPomodoro = () => {
    console.log("doPomodoro Created");
    new PomodoroSequence().execute();
};
