function CardBasic() {
  return (
    <div style={{ display: "flex", background: "gray" }}>
      <Card>
        <div>hi there</div>
      </Card>

      <Card>
        <div style={{ color: "red" }}>hello there</div>
      </Card>

      <Card>
        <div style={{ color: "green" }}>
          What do you want to post?
          <br />
          <input type="text" placeholder="posts" style={{ marginTop: 5 }} />
        </div>
      </Card>
    </div>
  );
}

// wrapper-card component
function Card({ children }) {
  return (
    // <div>
    <div
      style={{
        background: "black",
        borderRadius: 10,
        color: "white",
        padding: 10,
        margin: 10,
      }}
    >
      Upper topbar <br />
      <br />
      {children} <br />
      Lower bottom footer
    </div>
  );
}

export default CardBasic;
