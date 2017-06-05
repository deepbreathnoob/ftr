const {app, BrowserWindow, remote} = require('electron');
const url = require('url');
const path = require('path');
const addxmlf = require('./..main/addxmlfile.js');

//Create
exports.createWindowIndex = function() {

    //Create the browser window
  winIndex = new BrowserWindow({
    width: 800,
    height:600,
  });

  winIndex.webContents.openDevTools();
  winIndex.on('closed', () => {
    winIndex = null;
  })

  winIndex.webContents.on('did-finish-load', () => {
    winIndex.show();
    console.log('Index loaded');
  })
  //Load html and data to new window
  winIndex.loadURL(url.format({
    pathname: path.join(__dirname,'./../index.html'),
    protocol: 'file',
    slashes: true,
  }))

};
openedXML = addxmlf.openFiles();
