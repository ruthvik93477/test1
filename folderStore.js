// folderStore.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'folderMap.json');

function loadFolderMap() {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return {};
}

function saveFolderMap(map) {
  fs.writeFileSync(filePath, JSON.stringify(map, null, 2));
}

function addFolderMapping(linkId, folderName, folderId) {
  const map = loadFolderMap();
  map[linkId] = { folderName, folderId };
  saveFolderMap(map);
}

function getFolderByLink(linkId) {
  const map = loadFolderMap();
  return map[linkId];
}

module.exports = { addFolderMapping, getFolderByLink };
