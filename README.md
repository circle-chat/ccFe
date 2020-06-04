# The Circle
## The Mission
The Circle is a lightweight online chat website that randomly matches two people from a closed group for a one-on-one chat. These groups can exist for an organization, a collective shared interest, or just about anything else. Our vision is to strengthen communities by fostering relationships between members of a circle who wouldn’t normally take the time to chat and connect with each other.
The Circle is committed to privacy. Groups auto expire after a certain time frame and no private user information is ever stored.

## The Stack
The front end of The Circle was created using JavaScript and CSS within a React library. Connections to the backend are executed using web sockets.

### React / React Router / Redux
React is great we all love it.

### Socket.io
Socket.io was fundamental in this app due to the design of a real-time, bi-directional, and event based communication between the client and server.

### Circle CI
Circle CI is a very user friendly Continuous Intergration platform that uses a simple config file and is able to connect with github to make sure each Pull Request is tested prior to merging with the Production Branch

### Docker
Docker made managing the different contributors' local setups painless.  while enabling quick integration of new features and bug fixes to the deployed production server.

### Google Cloud Platform / CloudRun
Google Cloud Platform and its CloudRun service was chosen for its ease of use in deploying Docker containers. It also has built in security with automatic SSL and TLS. Additionally, it allows for serverless deployment and is available to the end user very quickly.

<img width="668" alt="Screen Shot 2020-06-04 at 2 22 41 PM" src="https://user-images.githubusercontent.com/10391857/83806630-0d1ff400-a66f-11ea-82a7-9b012f421631.png">

## The Function
The Circle allows users to join a group through the main page using a Group Code and a display Name. Then they can click the "Chat!" button to enter into a group, where they will be randomly matched with another user and placed in a chat room. At that point, the user may chat as long as they want.

A user may also create a group. From the main page, if they click the "Create Group" button, they will be navigated to a page where they can enter a group "Name", "Description", and "Rules" for the page. From there they may create the group and distribute the group code for others to use.

## The Features
The Circle integrates features to easily copy group links for distribution, to eliminate or enable profanity, and to introduce new users to the application.

## The How-To

## The Production

## The Goals

## The Backend
Python / Flask / Socket.io
The decision to use the Flask framework for Python came from the challenge of learning new language in a set amount of time. Flask and its many libraries are very well documented which allowed for rapid development on the backend. Flask and Pytest also work seamlessly together which enable near 100% test coverage.
[The Circle-Backend](https://github.com/circle-chat/cc-be "Backend Repository")

## The Team
[Ryan Allen](https://github.com/rcallen89 "Ryan's Github")
[David Atkins](https://github.com/d-atkins "David's Github")
[Kyle Barnett](https://github.com/KmBarnett "Kyle's Github")
[Ezekiel Clark](https://github.com/Yetidancer "Zeke's Github")
[Jordan Wallace Williams](https://github.com/iEv0lv3 "Wallace's Github")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
