const library = require("./library.js");

library.setPath("storage.json");
console.log(library.getPath());

let object = {
    name: "Akash Raj",
    id: 5,
    roll_num: 2105290
}

library.appendData(object);
library.getDataObject();