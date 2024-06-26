
# Study Timer App

## Overview

Inspired by the Pomodoro Technique, this app helps students manage their study time effectively. It includes features for setting specific times for studying and breaks, with notifications to keep users on track. Additional features include a to-do list and history of study time integrated into a calendar-like setup. A typical pomodoro session consists of four sessions: three cycles of 25 minutes of focused work followed by 5 minutes of rest, and the fourth session allows for a longer 30-minute break.

## Platforms

The project utilizes Electron.js for full-stack development to create a web interface deployable on MacOS, Windows, and Linux. Electron.js is a leading framework for building cross-platform applications, offering access to system APIs and native desktop application capabilities.

## File Structure

The project is organized as follows:
<pre>
study-timer-app/
│
├── package.json
├── tsconfig.json
├── webpack.config.json
├── package-lock.json
├── index.js
├── index.html
├── /built
│ └── ...
├── styles/
│ └── main.css
├── scripts/ 
│ ├── timer.ts
│ ├── todo.ts  
│ └── utils.ts
├── views/
│ └── timer.html
├── assets/
│ └── ...
├── tests/
  ├── e2e/
  │ └── ...
  ├── integration/
  │ └── ...
  └── unit/
    └── ...
</pre>

## Features

1. **Timer**: Allows users to set specific study and break times, following the Pomodoro Technique.
2. **To-Do List**: Enables users to keep track of tasks and assignments.
3. **History**: Provides a history of study sessions, including duration and progress.
4. **Calendar**: Offers a calendar view to plan study sessions and visualize progress.

## Development Guidelines

- Use Electron.js APIs to access system resources and create native desktop experiences.
- Follow best practices for JavaScript, HTML, and CSS to ensure code quality and maintainability.
- Test the application thoroughly to identify and fix bugs.
- Utilize version control (e.g., Git) and collaborate with team members using platforms like GitHub.

### How to build (Dev Team):

run `npm run build`, then `npm start`.
