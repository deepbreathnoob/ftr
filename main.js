const xml2rec = require('xml2rec');
const {app, BrowserWindow, dialog, remote} = require('electron');
const {ipcMain} = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');




// const cw = require('./main/createwindow');
//const addxmlf = require('./main/addxmlfile.js');



let winIndex = null;
let openedXML = null;
let cvsConverted = {};

createWindowIndex = function() {

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
    pathname: path.join(__dirname,'./index.html'),
    protocol: 'file',
    slashes: true,
  }))

};

app.on('ready',createWindowIndex)

function openFiles() {
  var files = dialog.showOpenDialog(winIndex, {
        properties: ['openFile'],
        filters: [
          { name: 'Markdown Files', extensions: ['xml'] }
        ]
      });

      if (!files) { return; }

      var file = files[0];
      var content = fs.readFileSync(file).toString();

      winIndex.webContents.send('file-opened', file, content);
      return content;
    };


const indexData = {
  name: 'Import Xml',
  placeholder: 'drop xml here'
}

global.indexData = indexData;

ipcMain.on('import-xml', (event) => {
  console.log('Received import-xml');
  openedXML = openFiles();
  console.log('Wczytano XML!');
})

// ipcMain.on('import-xml', (event) => {
//   var xml = null;
//   xml = openFiles();
//
//   if (xml) {
//     if( csv = xmlTocsv(xml)){
//       global.csvHeader = csv[0];
//       global.csvContent = csv[1];
//       event.sender.send('xml-imported');
//     }else {
//       console.log('nie zapisano zmiennych globalnych')
//     }
//   }else {
//     console.log('Nie zaladowao pliku')
//   }
//
//})
