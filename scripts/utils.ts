import { TodoList } from "./todo"
import { PomodoroSequence } from "./timer"

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
