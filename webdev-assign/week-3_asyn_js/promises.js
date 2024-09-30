class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  area() {
    return this.height * this.width;
  }

  paint() {
    console.log(`Painting with color ${this.color}.`);
  }
}

const rect = new Rectangle(2, 4, "red");
const area = rect.area();
console.log(area);
rect.paint();

// Date class
const date = new Date();
console.log(date); // curr time zome (UTC)
console.log(date.getDay()); // (0->sunday, 1->monday etc.)
console.log(date.getMonth()); // similarly month - 0->Jan, 1->Feb etc.
console.log(date.toISOString()); // UTC -> ISO

// Map class
const map = new Map();
map.set("name", "Alice");
map.set("age", 25);
console.log(map.get("name"));
