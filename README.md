#  React Card Slider

A simple react component that uses the slick slider to show stylised cards. Set the cards to show (maximum of 3) as a property of the CardSlider Component. Set slick configuration options in the CardSlider config file.

## Available Scripts

After installing dependencies with `yarn install`, you can run:

### `yarn start`

Runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make edits.

### `yarn test`

Launches the test runner in interactive watch mode (uses Jest).

### `yarn start-api`

Launches the cards API on [http://localhost:3001/cards](http://localhost:3001/cards).

## Cards API

You can use `yarn start-api` to serve the data in `data/db.json` through a JSON REST API.

This launches [json-server](https://github.com/typicode/json-server). From its various features, you might find useful:

 - Slicing, to get a subset of items: `http://127.0.0.1:3001/cards?_start=8&_end=12`;
 - Support for all HTTP verbs, like `PATCH`, which might help you like/unlike cards.
