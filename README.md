# Pomotime

A lightweight, terminal-based Pomodoro timer built with TypeScript to help you stay focused and productive.

## Features

* **Audio Alerts**: Plays a sound when a session ends.
* **Animations**: Fun animations of dogs.
* **Pause/Resume**: Full control over your current timer state.

## Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/kprasad001/pomotime.git
cd pomotime
npm install
```

## 💻 Usage

To compile the TypeScript code and start the timer, run:

```bash
npm run dev
```

## Project Structure

```text
├── src/
│   ├── assets/           # Resources
│   ├── assets/           # Media resources (audio alarm alerts, application icons)
│   ├── components/       # UI elements (Timer display, controls, settings panel)
│   ├── hooks/            # Custom React hooks (useTimer, useNotification)
│   ├── types/            # TypeScript type definitions and shared interfaces
│   ├── utils/            # Helper functions (time formatters, local storage keys)
│   ├── index.tsx         # Application entry point
│   └── main.tsx         # Core timer logic
├── dist/                 # Compiled JavaScript output
├── tsconfig.json         # TypeScript configuration
├── node_modules/         # Modules
└── package.json          # Project dependencies and scripts
```
