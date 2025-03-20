import { useState, useEffect } from "react";
import { usePostTitle, useFetch } from "./hooks/useFetch";

function Fetch() {
    const [currentPost, setCurrentPost] = useState(1);

//   const postTitle = usePostTitle(); // using a custom hook for fetching
  const {finalData, loading} = useFetch("https://jsonplaceholder.typicode.com/posts/" + currentPost); // generic hook for fetching data from the backend given a url
  
  return (
    <div>
      {/* 1. using component */}
      {/* <FetchPost /> */}

      {/* 2. using custom hook for fetching */}
      {/* {postTitle} */}

      {/* 3. using a generic hook -> useFetch */}
      <button onClick={()=>{setCurrentPost(1)}}>1</button>
      <button onClick={()=>{setCurrentPost(2)}}>2</button>
      <button onClick={()=>{setCurrentPost(3)}}>3</button>
      <br />
      {loading ? "loading..." : JSON.stringify(finalData)}
    </div>
  );
}

// normal fetching as we know as of now like the previous thing
function FetchPost() {
  const [post, setPost] = useState({});

  async function getPosts() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const json = await response.json();

    setPost(json);
  }

  // runs on mount
  useEffect(() => {
    getPosts();
  }, []);

  return <div>{post.title}</div>;
}

export default Fetch;
