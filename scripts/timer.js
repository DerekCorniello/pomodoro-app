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

class Stage {
    constructor(ptype, duration) {
        this.type = ptype;
        this.duration = duration;
    }
    toString() {
        return String(`Stage ${this.type.toString()}, Duration ${this.duration.toString()}`);
    }
}


function doPomodoro(sequence) {
    const stage = sequence.shift();
    if (!stage) {
        console.log("Sequence is empty. Pomodoro completed!");
        return;
    }

    const stageType = Object.keys(StageType).find(key => StageType[key] === stage.type);

    console.log(`Starting ${stageType} for ${stage.duration} minutes.`);

    setTimeout(() => {
        console.log(`Completed ${stageType}.`);

        if (sequence.length > 0) {
            doPomodoro(sequence);
        } else {
            console.log("Pomodoro completed!");
        }
    }, stage.duration * 60000); // Convert minutes to milliseconds
}

function startPomodoro(sequence) {
    console.log("pomodoro entered")
    defPomodoroSequence = [
        new Stage(StageType.WorkOne, 25),
        new Stage(StageType.BreakOne, 5),
        new Stage(StageType.WorkTwo, 25),
        new Stage(StageType.BreakTwo, 5),
        new Stage(StageType.WorkThree, 25),
        new Stage(StageType.BreakThree, 5),
        new Stage(StageType.WorkFour, 10),
        new Stage(StageType.BreakFour, 20),
    ];
    sequence = defPomodoroSequence || sequence;
    if (sequence.length !== 8) {
        throw new Error("Error: Pomodoro Sequence is not 8 stages."); //TODO: Maybe this isn't a constraint
    }
    console.log(sequence);
    return doPomodoro(sequence);
}

window.startPomodoro = startPomodoro;
