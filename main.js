const { app, BrowserWindow, Menu, session, shell } = require("electron");
const path = require("path");

const APP_ORIGIN = "https://vicw68-bit.github.io/LEAcalendar/";

const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.whenReady().then(() => {
    // The Firebase key is published for the GitHub Pages site. Send that
    // referrer so the desktop app is accepted the same way as the website.
    session.defaultSession.webRequest.onBeforeSendHeaders(
      {
        urls: [
          "*://*.googleapis.com/*",
          "*://*.firebaseio.com/*",
          "*://*.firebasedatabase.app/*",
        ],
      },
      (details, callback) => {
        details.requestHeaders.Referer = APP_ORIGIN;
        callback({ requestHeaders: details.requestHeaders });
      }
    );

    Menu.setApplicationMenu(null);

    const win = createWindow();

    app.on("second-instance", () => {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    });
  });

  app.on("window-all-closed", () => {
    app.quit();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: "Calendrier LEA",
    backgroundColor: "#0f172a",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.once("ready-to-show", () => win.show());
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("file:")) return;
    event.preventDefault();
    shell.openExternal(url);
  });
  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
}
