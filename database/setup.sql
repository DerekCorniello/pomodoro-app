CREATE DATABASE electron_app;
USE electron_app;

CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Sessions (
    sessionID INT AUTO_INCREMENT PRIMARY KEY,
    SessionStartTime DATETIME NOT NULL,
    SessionEndTime DATETIME NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE TodoList (
    listID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    ListTitle VARCHAR(255) NOT NULL,
    ListDescription TEXT,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE TodoItem (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    listID INT NOT NULL,
    TaskTitle VARCHAR(255) NOT NULL,
    TaskDescription TEXT,
    Timestamp DATETIME NOT NULL,
    isActive BOOLEAN NOT NULL,
    FOREIGN KEY (listID) REFERENCES TodoList(listID)
);

CREATE TABLE UserInfo (
    userID INT PRIMARY KEY,
    NumberOfSessions INT NOT NULL,
    TotalStudyTime INT NOT NULL NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);
