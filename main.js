const { app, BrowserWindow, nativeImage } = require('electron');
const fs = require("fs");
const path = require("path");

const URL = "https://meshcentral.carlbomsdata.se";
const windowStatePath = path.join(app.getPath("userData"), "window-state.json");

let mainWindowState;

function createWindow() {
    let maximized = false;

    try {
        mainWindowState = JSON.parse(fs.readFileSync(windowStatePath, "utf-8"));
        maximized = mainWindowState.maximized;
    } catch (e) {
        mainWindowState = {
            width: 800,
            height: 600,
            maximized: false
        };
    }

    const win = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Consider enabling this and using preload scripts for security.
        },
        title: "Meshcentral Desktop App",
        icon: nativeImage.createFromPath(path.join(__dirname, '/icons/png/128x128.png')) // Set the window icon here
    });

    win.setMenu(null);

    win.loadURL(URL);

    if (maximized) {
        win.maximize();
    }

    win.on("close", () => {
        let bounds = win.getBounds();
        // If the window is maximized, we want to save that it's maximized, but not update the bounds
        if (win.isMaximized()) {
            mainWindowState.maximized = true;
        } else {
            // Only update the window size if the window is not maximized
            mainWindowState = {
                width: bounds.width,
                height: bounds.height,
                maximized: false
            };
        }
        fs.writeFileSync(windowStatePath, JSON.stringify(mainWindowState));
    });

    win.on('unmaximize', () => {
        win.setSize(mainWindowState.width, mainWindowState.height);
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(customCSS);
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        // Instead of denying, we create a new modal window
        let modalWindow = new BrowserWindow({
            //parent: win,
            modal: false,
            show: false,
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            //title: "noVNC: "+win.getTitle(),
            icon: nativeImage.createFromPath(path.join(__dirname, '/icons/png/128x128.png')) // Set the window icon here
        });

        modalWindow.setMenu(null);

        modalWindow.loadURL(url); // Load the URL that was supposed to open in a new window
        modalWindow.once('ready-to-show', () => {
            modalWindow.show();
        });
        modalWindow.webContents.on('did-finish-load', () => { 
            modalWindow.setTitle("noVNC: "+win.getTitle());           
            modalWindow.webContents.insertCSS(customCSS);
        });

        // We handle the window open request by saying we're going to show the window ourselves
        return { action: 'deny' };
    });
}

app.whenReady().then(createWindow);

// Custom CSS to style the vertical scrollbar and hide the horizontal scrollbar
const customCSS = `
    /* Hide horizontal scrollbar */
    body {
        overflow-x: hidden;
    }

    /* Style the vertical scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px; /* Round the corners of the scrollbar track */
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px; /* Round the corners of the scrollbar thumb */
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    #footer {
        overflow: hidden !important;
    }
`;
