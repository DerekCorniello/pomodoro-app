"use strict";
const { assert } = require('assert');
class TodoList {
    constructor(title, items) {
        this.title = title;
        this.items = items;
    }
    deleteAt(index) {
        assert(index >= 0 && index < this.items.length, "Index out of Range!");
        return this.items.filter((_, i) => i !== index);
    }
    addItem(item) {
        this.items.push(item);
    }
    deleteItemAtIndex(index) {
        this.deleteAt(index);
    }
    deleteItemAtName(name) {
        this.deleteAt(this.items.findIndex(item => item.title === name));
    }
}
class ListItem {
    constructor(title, dueDate = null, description = null) {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
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
// Class for representing a stage
// ptype is a StageType, duration is a number value for minutes
class Stage {
    constructor(ptype, duration) {
        this.type = ptype;
        this.duration = duration;
    }
    toString() {
        return `Stage ${StageType[this.type]}, Duration ${this.duration.toString()}`;
    }
}
// Class for representing an entire pomodoro sequence
// inputs a list of 8 Stage types
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
window.doPomodoro = () => {
    console.log("doPomodoro Created");
    new PomodoroSequence().execute();
};
// If we have a login and logout functionality,
// I think this class is just a singleton at that
// point, idk if we need to do anything special with it
class User {
    constructor(username, password, todo = [], history = null, customPomodoros = null) {
        this.username = username;
        this.validateUsername();
        this.password = password;
        this.validatePassword();
        this.TodoList = todo;
        this.history = history;
        this.customPomodoros = customPomodoros;
    }
    static login(user, username, password) {
        // TODO
        // Connect to db or something idk
    }
    static logout(user) {
        // TODO
        // Disconnect from db lol?
    }
    validateUsername() {
        // TODO
        return this.username;
    }
    validatePassword() {
        // TODO
        return this.password;
    }
}
