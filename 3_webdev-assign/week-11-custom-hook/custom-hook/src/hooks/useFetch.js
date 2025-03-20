import { useEffect, useState, useRef } from "react";

// useFetch-1
// custom hook for fetching data from the backend - normal one
export function usePostTitle() {
  const [post, setPost] = useState({});

  async function getPosts() {
    // using hard-coded url
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

  return post.title;
}

// ***Important One***
// useFetch-2
// custom hook for fetching data from the backend given a URL - right way
// input -> url
// output -> data returned from the backend
export function useFetch(url) {
  const [finalData, setFinalData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getDetails() {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setFinalData(json);
    setLoading(false);
  }

  // fetch when url changes
  useEffect(() => {
    getDetails();
  }, [url]);

  return {
    finalData,
    loading,
  };
}

// useFetch-3
// all functionality of the above hook, and updated for re-fetching
// re-fetch data from backend every 5 or 10 seconds
export function useFetchReload(url) {
  const [finalData, setFinalData] = useState({});
  const [loading, setLoading] = useState(true);
  const intervalId = useRef(null);

  async function getDetails() {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFinalData(json);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  // fetch when url changes
  useEffect(() => {
    getDetails();
  }, [url]);

  // runs on-mount
  // set interval to refresh data every 5 seconds
  useEffect(() => {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        getDetails();
      }, 5 * 1000); // every 5 sec
    }

    // clean-up : unmount before re-rendering
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null; // reset ref to prevent memory leaks
      }
    };
  }, []);

  return {
    finalData,
    loading,
  };
}
