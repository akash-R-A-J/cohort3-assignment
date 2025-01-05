const fs = require("fs");
let filepath = "";

/*
    (NOTE: path is set to filepath by default but you have to give your filepath at least once.)
    
    FUNCTIONS:
    
    1.  setPath()
    2.  getPath()
    3.  readFileAsString()
    4.  readFileAsObject()
    5.  writeData()
    6.  appendData()
    7.  updateField()
    
*/

// set path of the file
function setPath(path) {
  filepath = path;
}

// get path of the file
function getPath() {
  return filepath;
}

// return data as string
function readFileAsString(path = filepath) {
  if (!path) throw new Error("Filepath is not provided.");
  if (!fs.existsSync(path)) throw new Error(`File does not exist: ${path}`);
  return fs.readFileSync(path, "utf-8");
}

// return data as object
function readFileAsObject(path = filepath) {
  return JSON.parse(readFileAsString(path));
}

// write this object in the file
function writeData(data, path = filepath) {
  if (!path) throw new Error("Filepath is not provided.");
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// adding an object to the given file
function appendData(data, path = filepath) {
  const existingData = readFileAsObject(path) || [];
  existingData.push(data);
  writeData(existingData, path);
}

// adding a field with some value in some object
function updateField(index, field, value, path = filepath) {
  const data = readFileAsObject(path);
  if (data[index]) {
    data[index][field] = value;
    writeData(data, path);
  } else {
    console.error("Index not found in the data.");
  }
}

module.exports = {
  setPath,
  getPath,
  readFileAsString,
  readFileAsObject,
  writeData,
  appendData,
  updateField,
};
