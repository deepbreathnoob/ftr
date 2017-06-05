const {app, BrowserWindow, dialog, remote} = require('electron');
const fs = require('fs');

exports.openFiles = function() {
  var files = dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          { name: 'Markdown Files', extensions: 'xml' }
        ]
      });

      if (!files) { return; }

      var file = files[0];
      var content = fs.readFileSync(file).toString();

      console.log(content);
    };
