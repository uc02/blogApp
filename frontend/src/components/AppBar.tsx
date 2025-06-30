import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="sticky top-0 border-b flex justify-between px-10 m-2">
      <Link to={"/blogs"} className="m-1 flex justify-center flex-col">
        Blog App
      </Link>
      <div className="m-1">
        <Link to={`/publish`}>
          <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
        </Link>

        <Avatar size="big" name="Umang" />
      </div>
    </div>
  )
}

export default AppBar
