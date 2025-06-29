import { BlogCard } from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton"; // Assuming you have a Skeleton component

const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className="max-w-xl w-full">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            Loading....
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-xl">
            Error loading blogs: {error}
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">
            No blogs found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl w-full">
          {blogs.map(blog => (
            <BlogCard
              id={blog.id}
              authorName={blog.author?.name || 'Anonymous'} // Safe access with optional chaining
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2025"} // You might want to make this dynamic
            />
          ))}
        </div> 
      </div>
    </div>
  );
};

export default Blogs;