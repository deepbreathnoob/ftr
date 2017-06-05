var app = require('electron');
var remote = app.remote;
const {ipcRenderer} = require('electron')

//


var indexData = remote.getGlobal('indexData');
// var title = document.getElementsByTagName("title")[0];
// title.innerHTML = inde

if(setTitle(indexData.name)){
  console.log('Title set up');
} else console.log('Title unset')


function setTitle(newTitle) {
  var title = document.getElementsByTagName("title")[0];
  title.innerHTML = newTitle;
  if (newTitle == title.innerHTML) {
    return true
  } else return false;
}


var elOF = document.getElementById('openFile');
if(elOF) {
  elOF.addEventListener('click', function() {
    if(ipcRenderer.send(
      'import-xml'
    )) {console.log('Wyslano ipc import-xml')}
  });
} else console.log('Brak elementu o id openFile')

var closeElem = document.getElementById('closePage')
if (closeElem) {
  closeElem.addEventListener('click', function() {
    ipcRenderer.send(
      'import-xml'
    );
  });
}

ipcRenderer.on('xml-imported', () => {
  var element = document.getElementById("editor");
  element.innerHTML = 'Zmianiam';
});
ipcRenderer.on('file-opened', (event, file, content) => {
  console.log(content);
})
