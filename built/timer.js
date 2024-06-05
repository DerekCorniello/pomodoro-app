"use strict";
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
var Stage = /** @class */ (function () {
    function Stage(ptype, duration) {
        this.type = ptype;
        this.duration = duration;
    }
    Stage.prototype.toString = function () {
        return "Stage ".concat(StageType[this.type], ", Duration ").concat(this.duration.toString());
    };
    return Stage;
}());
// Class for representing an entire pomodoro sequence
// inputs a list of 8 Stage types
var PomodoroSequence = /** @class */ (function () {
    function PomodoroSequence(sequence) {
        if (sequence === void 0) { sequence = null; }
        this.sequence = [];
        this.setSequence(sequence);
    }
    // Set the sequence, check to ensure it is valid as well
    PomodoroSequence.prototype.setSequence = function (sequence) {
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
    };
    // Get the sequence list
    PomodoroSequence.prototype.getSequence = function () {
        return this.sequence;
    };
    // Execute the sequence
    PomodoroSequence.prototype.execute = function () {
        // Create a copy of the sequence so data can be retained
        var sequence = this.getSequence().slice();
        // Create a recursive function that will manage the pomodoro
        var runStage = function (seq) {
            // Base case, if there are no more stages, end
            if (seq.length === 0) {
                console.log("Pomodoro completed!");
                return;
            }
            // Takes the first element, get a bunch of its info
            var stage = seq.shift();
            var stageType = StageType[stage.type];
            console.log("Starting ".concat(stageType, " for ").concat(stage.duration, " minutes."));
            setTimeout(function () {
                console.log("Completed ".concat(stageType, "."));
                runStage(seq); // Continue with the next stage
            }, stage.duration * 60000); // Convert minutes to milliseconds
        };
        runStage(sequence);
    };
    return PomodoroSequence;
}());
window.doPomodoro = function () {
    console.log("doPomodoro Created");
    new PomodoroSequence().execute();
};
