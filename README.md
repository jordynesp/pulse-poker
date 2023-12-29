# PulsePoker

An online planning poker environment for agile estimation.

![Alt text](/../screenshots/screenshots/PulsePokerHome.png?raw=true "Optional Title")

## Description

PulsePoker was the result of exploring Firebase during a cloud computing class research project. With this app, users can create virtual planning poker rooms and invite other users to join them by sharing room codes. Once in a room, the room creator/moderator can create ticket descriptions that users will then estimate. The moderator can start and stop voting for the estimation process, and once finished, votes are revealed for each person in the room. It is a tool meant to assist agile teams in planning their upcoming work. New features and fixes are in progress.

## Getting Started

### Dependencies

* Firebase project with web app:
  * must have Google added as an authentication provider
  * must have Realtime Database enabled
* Node.js and npm to run React app locally

### Installing

* Clone this repo
* Make a copy of `.env.example` called `.env` and fill in the values from your Firebase project's web app config

### Executing program

* In the project directory, you can run: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
