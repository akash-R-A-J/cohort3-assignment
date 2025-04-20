export const TestNormal = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-aroundF" }}>
      <div style={{ background: "green" }}>
        hii there I am from <b>first</b> div.
      </div>
      <div style={{ background: "red" }}>
        hii there I am from <b>second</b> div.
      </div>
      <div style={{ background: "pink" }}>
        hii there I am from <b>third</b> div.
      </div>
    </div>
  );
};

// using tailwind for the same above style
// using flex
export const TestTailwind = () => {
  return (
    <div className="flex justify-around">
      <div className="bg-blue-300">
        hii there I am from <b>first</b> div.
      </div>
      <div className="bg-red-300">
        hii there I am from <b>second</b> div.
      </div>
      <div className="bg-pink-300">
        hii there I am from <b>third</b> div.
      </div>
    </div>
  );
};

// using grid
export const TestGrid = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="bg-blue-300 col-span-4">
        hii there I am from <b>first</b> div.
      </div>
      <div className="bg-red-300 col-span-6">
        hii there I am from <b>second</b> div.
      </div>
      <div className="bg-pink-300 col-span-2">
        hii there I am from <b>third</b> div.
      </div>
    </div>
  );
};

// for responsiveness
// by default -> bg color red,
// after small -> bg color blue,
// after medium -> bg color green,
// after extra large -> bg color pink
export const Responsive = () => {
  return (
    <div className="bg-red-300 sm:bg-blue-300 md:bg-green-300 xl:bg-pink-300">
      hello
    </div>
  );
};

// changing flex-col to felx-row using grid
export const Responsive_2 = () => {
  return (
    <div className="md:grid md:grid-cols-12">
      <div className="bg-blue-300 md:col-span-4 text-white"> child-1 </div>
      <div className="bg-pink-300 md:col-span-5 text-white"> child-2 </div>
      <div className="bg-red-300 md:col-span-3 text-white"> child-3 </div>
    </div>
  );
};
