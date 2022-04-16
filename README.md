# Flights Search
## About
A single page application that displays MCF flight information from given API endpoints.

The endpoints are made to fail periodically to test the webapp's ability to handle errors.

Flight data is only available from today, till 1 month later.

The webapp can be viewed live [here](https://sh4nnongoh.github.io/flight-search/).

The list of user stories can be viewed [here](https://trello.com/b/gM8JgjeL/flights).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick Start
```
// Execute Tests
yarn test

// Start the CORS server to allow requests from localhost
yarn cors

// Start the webapp locally
yarn start
```

## Available Scripts
Refer to ```package.json```, for the list of available commands.

## Test-Driven Development with RTL & Cucumber
Navigating to ```src/__tests__``` , one can see that the tests are written in a way that mimics the actual User Story. This acts as a contract between developers and the product owner as to what features have been completed, and will carry on to exist throughout the product lifecycle. There are no unit tests in this project as they do not provide any value to the product; unit tests act as a medium of communication between developers and will be dependent on internal best practices made by the team. With React Testing Library (RTL), writing User Story tests that mimics actual user behavior is made possible, while also being able to execute as fast as how traditonal unit tests do.
