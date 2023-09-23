# demoqa
This project is based on testing the [demoqa.com](https://www.toolsqa.com). It serves as a learning resource for the Selenium Test Framework. The tests are written in JavaScript and cover various aspects of testing, including elements, contact forms, alerts, frames, windows, widgets, and anything else available on the mentioned testing website.

Before you begin, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/): The project relies on Node.js for running JavaScript code.

## Getting Started
Follow these steps to get started with the project:

1. Clone this repository to your local machine:
git clone https://github.com/IvanDjurdjevic/demoqa.git
2. Navigate to the project directory:
cd demoqa
3. Install the required project dependencies:
npm install
4. Run the tests:
npm test

## Installing Dependencies
To install the required dependencies, open your terminal/command prompt and navigate to the project directory. Then, run the following commands:

1. Install `mocha`:

   ```bash
   npm install mocha

2. Install `mochawesome`:

   ```bash
   npm install mochawesome

3. Install `dotenv`
   ```bash
   mpm install dotenv

## Setting up Environment Variables
Create a .env file in the project directory and define the USE_BROWSER variable. This variable should contain the name of the web browser for which you have a corresponding web driver.

Example .env file:
USE_BROWSER = "chrome"

## Usage
You can customize and extend the test cases according to your needs. Feel free to explore the test scripts located in the project's source code to gain a better understanding of how the Selenium Test Framework works.

## Contributing
If you'd like to contribute to this project, please follow the standard GitHub flow:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Create a pull request to merge your changes into the main repository.