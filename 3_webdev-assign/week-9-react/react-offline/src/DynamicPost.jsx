// Nesting Components

import { useState } from "react";
import PostComponent from "./Post"; // for default export

// `App` component uses the `PostComponent`
function Dynamic() {
  // storing all posts in an array
  const [posts, setPosts] = useState([]);
  /*   RAW Variable
   const posts = [
     {
       name: "harkirat",
       subtitle: "27835 followers",
       time: "2m ago",
       image:
         "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
       description:
         "Want to know how to win big? Check out how these folks won $6000 inbounties.",
     },
   ];
  */

  // converting each post from posts to a component using map
  const postComponents = posts.map((post) => (
    <PostComponent
      name={post.name}
      subtitle={post.subtitle}
      time={post.time}
      image={post.image}
      description={post.description}
    />
  ));

  function addPost() {
    // ... -> spread operator
    setPosts([
      ...posts,
      {
        name: "harkirat",
        subtitle: "27835 followers",
        time: "2m ago",
        image:
          "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
        description:
          "Want to know how to win big? Check out how these folks won $6000 inbounties.",
      },
    ]);
    // posts.push({
    //   name: "harkirat",
    //   subtitle: "27835 followers",
    //   time: "2m ago",
    //   image:
    //     "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
    //   description:
    //     "Want to know how to win big? Check out how these folks won $6000 inbounties.",
    // });
  }

  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>
      <button onClick={addPost}>Add Post</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}

export default Dynamic;
