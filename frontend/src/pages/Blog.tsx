import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import AppBar from "../components/AppBar";
import { Skeleton } from "../components/Skeleton";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if(loading || !blog){
    return <div>
      <AppBar />

      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Skeleton/> 
        </div>
      </div>
    </div>
  }
  return <div>
    <FullBlog blog={blog}  />
    {/* {JSON.stringify(blog)} */}
  </div>
}

export default Blog;