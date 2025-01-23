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
    8.  isPresent()
    
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
  let data = readFileAsString(path).trim();
  if (data) {
    return JSON.parse(readFileAsString(path));
  }
  return [];
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

// will check if an object is already present or not? by matching the description
// return the index of the object, return -1 if not found
function isPresentAsObject(todo) {
  const data = readFileAsObject();
  for (let i = 0; i < data.length; i++) {
    if (data[i].description.toLowerCase() === todo.description.toLowerCase()) {
      return i; // Return the index if a match is found
    }
  }

  return -1; // Return -1 if no match is found
}

function isPresentAsString(todo) {
  const data = readFileAsObject();
  for (let i = 0; i < data.length; i++) {
    if (data[i].description.toLowerCase() === todo.toLowerCase()) {
      return i; // Return the index if a match is found
    }
  }

  return -1; // Return -1 if no match is found
}

module.exports = {
  setPath,
  getPath,
  readFileAsString,
  readFileAsObject,
  writeData,
  appendData,
  updateField,
  isPresentAsObject,
  isPresentAsString,
};
