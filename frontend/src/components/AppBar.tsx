import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="sticky top-0 border-b flex justify-between px-10 m-2">
      <Link to={"/blogs"} className="m-1 flex justify-center flex-col">
        Blog App
      </Link>
      <div className="m-1">
        <Avatar size="big" name="Umang" />
      </div>
    </div>
  )
}

export default AppBar
