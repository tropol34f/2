const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
function create() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1280, height: 720, backgroundColor: '#000000', title: 'Хрущёвки-85',
    autoHideMenuBar: true,
    webPreferences: { autoplayPolicy: 'no-user-gesture-required' }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
