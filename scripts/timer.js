// Enum type for a stage
const StageType = Object.freeze({
    WorkOne: 0,
    BreakOne: 1,
    WorkTwo: 2,
    BreakTwo: 3,
    WorkThree: 4,
    BreakThree: 5,
    WorkFour: 6,
    BreakFour: 7,
});


// class for representing a stage
// arguments -> ptype is a StageType, duration is an number value for minutes
class Stage {
    constructor(ptype, duration) {
        this.type = ptype;
        this.duration = duration;
    }
    toString() {
        return `Stage ${this.type.toString()}, Duration ${this.duration.toString()}`;
    }
}

// class for representing an entire pomdoro sequence
// has private variable sequence for intuitive checking of inputs
// inputs a list of 8 Stage types
class PomodoroSequence {
    #sequence;

    constructor(sequence = null) {
        this.setSequence(sequence);
    }

    // set the sequence, check to ensure it is valid as well
    setSequence(sequence) {
        if (sequence === 8) {
            this.#sequence = sequence;
        } else {
            // use the default pomodoro sequence
            this.#sequence = [
                new Stage(StageType.WorkOne, 25),
                new Stage(StageType.BreakOne, 5),
                new Stage(StageType.WorkTwo, 25),
                new Stage(StageType.BreakTwo, 5),
                new Stage(StageType.WorkThree, 25),
                new Stage(StageType.BreakThree, 5),
                new Stage(StageType.WorkFour, 10),
                new Stage(StageType.BreakFour, 20),
            ];
        }
    }

    // get the sequence list
    getSequence() {
        return this.#sequence;
    }

    // execute the sequence
    execute() {
        // create a copy of the sequence so data can be retained
        const sequence = this.getSequence().slice();

        // create a recursive func that will manage the pomodoro
        const runStage = (seq) => {
            // base case, if there are no more stages, end
            if (seq.length === 0) {
                console.log("Pomodoro completed!");
                return;
            }
            // takes the first element, get a bunch of its info
            const stage = seq.shift();
            const stageType = Object.keys(StageType).find(key => StageType[key] === stage.type);

            console.log(`Starting ${stageType} for ${stage.duration} minutes.`);

            setTimeout(() => {
                console.log(`Completed ${stageType}.`);
                runStage(seq); // continue with the next stage
            }, stage.duration * 60000); // Convert minutes to milliseconds

            // TODO: Somehow await for a event before moving on?

        };

        runStage(sequence);
    }
}

window.doPomodoro = () => {
    new PomodoroSequence().execute();
};
