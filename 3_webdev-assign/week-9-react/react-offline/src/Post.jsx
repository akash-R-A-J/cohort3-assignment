// styling the parent element
const style = {
  width: 400,
  padding: 10,
  margin: 10,
  backgroundColor: "gray",
  borderRadius: 10,
  borderColor: "red",
  borderWidth: 2,
};

// writing self-contained HTML in this component
function PostComponent({ name, subTitle, time, image, description }) {
  // inline CSS
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <img
          src={image}
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
          }}
          alt=""
        />

        <div style={{ fontSize: 10, marginLeft: 5 }}>
          <b>{name}</b>
          <div>{subTitle}</div>
          {/* below section is conditionally rendered */}
          {/* this section will get displayed only if the time is given else not. */}
          {/* we can also use condition like this: {time !== undefined && ...rest of the thing}  */}
          {/* or we can also use ternary operator here */}
          {time && (
            <div style={{ display: "flex" }}>
              <div>{time} </div>
              <img
                src={
                  "data:image/png;base64,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"
                }
                style={{ width: 10, height: 10, marginLeft: 4 }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ fontSize: 15 }}>{description}</div>
    </div>
  );
}

export default PostComponent;
