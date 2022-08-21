# QuickSocket Example Node
Welcome to the [QuickSocket](https://quicksocket.io/) Example Node application. This is a basic chat app used to demonstrate how to intergrate with QuickSocket. Be sure to follow the instructions below if you're attempting to run this your own machine.

## Install

You'll need to install the node packages to run this example application:
```
  $ npm install
```

## Setup

Create a `.env` file in the root directory and add your QuickSocket Environment variables to it. Your Environment variables can be found on the [QuickSocket Platform](https://app.quicksocket.io/) under the Environment's Summary tab. Check out the `.env.sample` file to see what you need to include.

If you are planning to use [`qs-forward`](https://github.com/QuickSocket/qs-forward) to receive the QuickSocket Callback requests:
- Make sure your QuickSocket Environment is set to callback mode "Forward" under the Callback tab.
- Head on over to the `qs-forward` repository for instructions on how to set up your machine to receive the QuickSocket callback requests.
- Start running `qs-forward` from your command line. The `qs-forward` callback URL will be `http://localhost:3000/api/v1/quicksocket/callback`. Check out the Usage section in the `qs-forward` README for details.
## Start

To start the example application:
```
  $ npm start
```
Then go to your [http://localhost:3000/](http://localhost:3000/) to see the example application in action.
