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
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Full API response:", response);
        console.log("Response data:", response.data); 

        const receivedBlogs = response.data.blogs

        setBlogs(receivedBlogs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err); // Log the full error
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

export const useBlog = ({ id }: { id: string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Full API response:", response);
        console.log("Response data:", response.data); 

        const receivedBlogs = response.data.blog

        setBlog(receivedBlogs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err); // Log the full error
        setError(err.response?.data?.message || "Failed to fetch blogs");
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    error
  };
};