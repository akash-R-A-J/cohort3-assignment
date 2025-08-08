"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateUser(updatedProps) {
    // hit the database to update the user
    console.log("user database updated with: " + updatedProps);
}
let newUser = {
    name: "Harkirat",
    age: 25,
    email: "kirat@gmail.com",
};
updateUser(newUser);
//# sourceMappingURL=index.js.map