const { app, BrowserWindow, globalShortcut } = require("electron");

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        // TODO Dynamic changes?
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("index.html");

    // Close the window when it's closed
    mainWindow.on("closed", () => {
        app.quit();
    });

}

function switchToTimerWindow() {
    mainWindow.loadFile("views/timer.html").then(() => {
        mainWindow.webContents.executeJavaScript("window.doPomodoro();");
    });
}

app.whenReady().then(() => {
    createMainWindow();
    // Register 'Enter' key shortcut to switch to timer window
    // TODO: Create UI to handle this event
    globalShortcut.register("Enter", () => {
        console.log("Enter key pressed");
        switchToTimerWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

app.on("will-quit", () => {
    // Unregister all shortcuts
    globalShortcut.unregisterAll();
});
