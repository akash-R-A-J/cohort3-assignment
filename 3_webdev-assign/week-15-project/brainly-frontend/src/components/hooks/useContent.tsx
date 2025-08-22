import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export const useContent = () => {
  const [contents, setContents] = useState([]);

  async function fetchContents() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setContents(response.data.contents);
  }

  useEffect(() => {
    fetchContents();
    
    let id = setInterval(() => {
      fetchContents();
    }, 10 * 1000); // fetch contents every 10 sec

    return () => {
      clearInterval(id);
    };
  }, []);

  return {contents, fetchContents};
};
