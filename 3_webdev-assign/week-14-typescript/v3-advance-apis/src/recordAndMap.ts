// 4. RECORD AND MAP

type User = {
  id: string;
  username: string;
};

type Users = {
  [id: string]: User;
};

// we can use User and Users type for an object something like this
const user1: Users = {
  rwdhdkh: {
    id: "ygwbd",
    username: "harkirat",
  },

  uygwank: {
    id: "bjhhawned",
    username: "sanskar",
  },
};

console.log(user1);

// 1. Record -> let's us give a cleaner type to objects
// but we can achieve similar results using record in a better, easiest way

type UserRecord = Record<string, User>;
const user2: UserRecord = {
  rwdhdkh: {
    id: "ygwbd",
    username: "harkirat",
  },

  uygwank: {
    id: "bjhhawned",
    username: "sanskar",
  },
};

// 2. Map (more easier and simple syntax), very similar to map in java, or c++
const users = new Map<String, User>();
users.set("acbk", { id: "harkirat123", username: "harkirat" });
users.set("sajf", { id: "shbakb", username: "sanskar" });

const user = users.get("acbk");
console.log(user);

// 5. EXCLUDE
// In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.
type Event = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<Event, "scroll">;

const handleEvent = (event: ExcludeEvent) => {
  console.log(`handling events: ${event}`);
};

handleEvent("click");
// handleEvent('scroll'); //you will get error in this because 'scroll' is excluded
