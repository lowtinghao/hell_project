<h1 align="center">
  <br>
  <img src="front\src\assets\dell_logo.svg" alt="Markdownify" width="150">
  <br>
  Resource Management Application
  <br>
</h1>

<h4 align="center">This webapp is meant to help manage client workshop requests, trainer allocation and workshops for the "presales" department of a technology company - Dell Technologies.</h4>


<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#technical-description">Technical Description</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#contributors">Contributors</a> •
</p>


## Key Features

* Three Base User Modes
    - Client | Customers requesting for workshops
    - Admin | Director of the Presales Department
    - Trainers | Members of the Presales Department who conduct the workshops
* Workshop 
    - Clients may make workshop requests
    - Admin may view all workshops and update, approve and allocate trainers to each workshop
    - Trainers may view their workshop schedules and details

## Technical Description
This application is built using the following:
* Frontend | React.js & Material UI
* Backend | Express.js, Moongoose & MongoDB

A set of test cases has also been developed for this project. 


### How to Use
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/lowtinghao/hell_project.git

# Go into the repository
$ cd hell_project/front

# After cloning this repository , install dependencies
$ npm install

# Run the app
$ npm start

# Optional - install nodemon for faster development
$ npm i nodemon
```

For the Frontend, you will need to install the following via your command line. Ensure you are in the "front" folder.

```bash
# Material UI
$ npm install @mui/material @emotion/react @emotion/styled

# Roboto font
$ npm install typeface-roboto --save

# Babel Presets [Testing]
$ npm install --save-dev @babel/preset-env @babel/preset-react
$ npm install --save-dev babel-jest

# Jest Transform stub - handles non-JavaScript assets like images [Testing]
$ npm install jest-transform-stub --save-dev

# Socket.io for notifications
$ npm install socket.io-client

# @testing-library
$ npm install @testing-library/react
$ npm install --save-dev @testing-library/user-event
```

For the Backend, you will need to install the following via your command line. Ensure you are in the "back" folder

```bash
# Jest, In-memory mongoDB, Mongoose
$ npm install --save-dev jest mongodb-memory-server mongoose

#
```

For the Socket, you will need to install the following via your command line. Ensure you are in the "socket" folder

```bash
# Socket.io for notifications
$ npm install socket.io

#
```




> **Note**
> If you're using newer versions of node.js you may need to change your node version. An easy way to do this is by using [nvm](https://github.com/coreybutler/nvm-windows).


## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Material UI](https://mui.com/material-ui/)
- [Mongo DB](https://www.mongodb.com/docs/manual/administration/install-community/)
- [highlight.js](https://highlightjs.org/)

## Contributors

Justin Cho Ming Jun | Koh Yee Cheng, Danae
Larioza Andrea Ronquillo | Lindero Dianthe Marithe Lumagui
Low Ting Hao | Muthu Ramaswamy | V Priyanka Valli

