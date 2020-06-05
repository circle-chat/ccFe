# The Circle

![giphy-1](https://user-images.githubusercontent.com/56602822/83891447-ca175c80-a712-11ea-91d5-88beb2691242.gif)

https://circle-fe-jcg5wby7mq-uc.a.run.app/
## The Mission
The Circle is a lightweight online chat website that randomly matches two people from a closed group for a one-on-one chat. These groups can exist for an organization, a collective shared interest, or just about anything else. Our vision is to strengthen communities by fostering relationships between members of a circle who wouldn’t normally take the time or have the chance to connect with each other.

The Circle is committed to privacy. Groups auto expire after a certain time frame and no private user information is ever stored.

## The Stack
The front end of The Circle was created using JavaScript and CSS within a React library. Connections to the backend are executed using web sockets.

### React / React Router / Redux
We used React to create an interactive, component-based UI. Redux and React Router were incorporated to deal with state management and routing.

### Socket.io
Socket.io was fundamental in this app due to the design of a real-time, bi-directional, and event based communication between the client and server.

### Circle CI
Circle CI is a user friendly Continuous Integration platform that uses a simple config file and is able to connect with GitHub to make sure each Pull Request is tested prior to merging with the Production Branch

### Docker
Docker made managing the different contributors' local setups painless.  while enabling quick integration of new features and bug fixes to the deployed production server.

### Google Cloud Platform / Cloud Run
Google Cloud Platform and its Cloud Run service was chosen for its ease of use in deploying Docker containers. It also has built in security with automatic SSL and TLS. Additionally, it allows for serverless deployment and is available to the end user very quickly.

<img width="662" alt="Screen Shot 2020-06-05 at 8 22 47 AM" src="https://user-images.githubusercontent.com/10391857/83890864-9552d780-a709-11ea-8f2d-13e08a12f416.png">

## The Function
At The Circle a user may create a group. From the main page, if they click the "Create Group" button, they will be navigated to a page where they can enter a group "Name", "Description", and "Rules" for the page. From there they may create the group and distribute the group code for others to use.

![giphy](https://user-images.githubusercontent.com/56602822/83891380-afdd7e80-a712-11ea-9c76-6235b31e2ef1.gif)

The Circle allows users to join a group through the main page using a Group Code and a display Name. Then they can click the "Chat!" button to enter into a group, where they will be randomly matched with another user and placed in a chat room. At that point, the user may chat as long as they want.



## The Features
The Circle integrates features to easily copy group links for distribution, to eliminate or enable profanity, and to introduce new users to the application.

## The How-To
In order to run this repository locally, start by forking and cloning the repository.
Then you will need to download and install the docker app.

To setup the Back-End go [here](https://github.com/circle-chat/cc-be/blob/master/README.md).

Point your favorite web browser to `localhost:8080`

## The Production
In order to set up the repository for production, run the commands below:
```
yarn global add serve
yarn build
serve <repo_name>
```

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
