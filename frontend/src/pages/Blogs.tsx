import axios from "axios";
import { BACKEND_URL } from "../config"
import { BlogCard } from "../components/BlogCard";

// async function getBlog () {
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
//     const blogs = response.data;

//   } catch (error) {
    
//   }
// }

const Blogs = () => {
  return (
    <div>
      <BlogCard 
        authorName={"Upendra"}
        title={"The man the myth the legend"}
        content={"This blog explain that why i am the best why i should be best"}
        publishedDate={"2nd June"}
      />
    </div>
  )
}

export default Blogs
