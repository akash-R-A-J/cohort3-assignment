interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
}

// Some Advance APIs

// 1. PICK -> creates a new type by selecting a set of properties from an existing type.
type UpdateProps = Pick<User, "name" | "age" | "email">;

// 2. PARTIAL -> makes all properties of a type optional.
type updatePropsOptional = Partial<UpdateProps>;

function updateUser(updatedProps: updatePropsOptional) {
  // hit the database to update the user
  console.log("user database updated with: " + updatedProps.name);
}

updateUser({
  name: "Harkirat",
});

// 3. Readonly -> enforces constant on internal values
interface Config {
  readonly endpoint: string;
  readonly apikey: string;
}

// we can also use readonly like this
let user2: Readonly<updatePropsOptional> = {
  name: "harkirat",
  age: 22,
  email: "h@gmail.com",
};

console.log(user2);
// user2.name = "raj"; // you will get reassignment error, cause user2 is a read-only variable