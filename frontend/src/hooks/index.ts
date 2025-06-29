import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export interface Blog {
  content: string;
  title: string,
  id: string
  author: {
    name: string
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${token || ""}`
      }
    })
      .then(response => {
        const receivedBlogs = response.data.posts || response.data;
        if (Array.isArray(receivedBlogs)) {
          setBlogs(receivedBlogs);
        } else {
          setError("Invalid response format from server");
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    error
  };
};