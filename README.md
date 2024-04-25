# Meshcentral Desktop App 💻

This repository contains the Meshcentral Desktop App 🌐, a cross-platform desktop application for [Meshcentral](https://meshcentral.com), built with [Electron](https://www.electronjs.org/). The application allows users to connect to their Meshcentral server using a native desktop client.

## App Architecture 🏗️
Here's a brief overview of the main components of this Electron application:

* `main.js` - The entry point of the application. It sets up the main window and the modal windows, handling their behavior and appearance.
* `package.json` - Defines the project dependencies and the build script.
* `icons/` - This directory contains the icons for the application, generated using `electron-icon-builder`.

### Customization ⚙️

The application loads a custom CSS to improve the scrollbar aesthetics and prevent overflow issues. You can modify this CSS in the `main.js` file to match your preferences.

### Modals and External Links 🖇️
External links open in a new modal window rather than the default browser. This behavior is defined in the `windowOpenHandler` within `main.js`.

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites 📋

Before you can run or build the Meshcentral Desktop App, you must have the following installed:

- [Node.js](https://nodejs.org/) (which comes with [npm](http://npmjs.com/)).

### Installing 🛠️

To get the app running locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the cloned repository's directory in your terminal.
3. Install the required npm packages by running:
```bash
npm install
```

### Running the App ▶️

Once you've installed the dependencies, you can start the app using:
``` bash
npm start
```

This command will launch the Electron application and load the Meshcentral server page defined in the `main.js` file.

### Building the App 🏗️

To build the application for production, run the following command:
``` bash
npm run dist
```

This command will package the app into a distributable format.

## Contribution 👥

Feel free to fork the project and submit pull requests.

## License 📄

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments 💖

- The Meshcentral team for providing the open-source management web portal.
- The Electron community for the framework to build cross-platform desktop apps.
