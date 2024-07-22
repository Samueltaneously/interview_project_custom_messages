# Message Template App

## Overview

This React application allows users to create and customize message templates. The app integrates guest and company data to generate personalized messages based on the selected template. Users can also add their own custom templates.

## Instructions for Running the Program

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the App:**
   ```bash
   npm start
   ```

The app will run on http://localhost:3000.

## Design Decisions

React Framework: The application is built using React for its efficient state management.

State Management: React's useState hook is used to manage the state of selected templates, guests, companies, and the generated message.

Moment.js: Moment.js, along with Moment Timezone, is used to handle the time-related functions of converting timestamps and Timezones for generating appropriate greetings based on the time of day.

## Language Choice

JavaScript & React: React was chosen due to ease of creating interactive UIs, and efficient state management. JavaScript is a modern and popular web app language, with many built in methods that help streamline the coding.

## Verifying Program Correctness

Due to the simple nature of the app's scope, manual and integration testing were primarily implemented. The simple GUI aided in verifying all items populated and could be edited correctly. Edge cases were considered, and even demanded the implementation of the Moment library to account for proper timezone cases.

## What to Do With More Time

With more time a backend could be implemented to allow the user's generated template to be stored to the JSON file, rather than as it currently is (in React State which does not save from one instance to the next). A Nicer GUI, with more options, and perhaps a search function would also be ideal to streamline user interface. I would also like to try the challange of implementing a non GUI version with the CLI terminal in the language C, rather than a React App.