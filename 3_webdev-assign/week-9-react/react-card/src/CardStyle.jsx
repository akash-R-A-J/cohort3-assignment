import React from "react";

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        margin: "10px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </div>
  );
};

const CardUsage = () => {
  return (
    <div>
      <Card>
        <h2>Card Title</h2>
        <p>This is some content inside the card.</p>
      </Card>
      <Card>
        <h2>Another Card</h2>
        <textarea type="text"></textarea>
        <p>This card has some different content!</p>
      </Card>
    </div>
  );
};


// 9. List and Keys
export const List = () => {
  return (
    <div>
      {[
        // we need key to make each elm unique
        <Todo key={1} title={"go to gym"} done={false} />,
        <Todo key={2} title={"eat food"} done={true} />,
      ]}
    </div>
  );
};

function Todo({ title, done }) {
  return (
    <div>
      {title} - {done ? "Done!" : "Not done!"}
    </div>
  );
}

export default CardUsage;
