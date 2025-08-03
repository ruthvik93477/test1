// folderStore.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'folderData.json');

// Load from JSON file
function getStoredFolder1() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf8');
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Save to JSON file
function saveFolder1(folderName, folderId) {
  const data = { folderName, folderId };
  fs.writeFileSync(dataPath, JSON.stringify(data));
}

module.exports = { getStoredFolder1, saveFolder1 };
