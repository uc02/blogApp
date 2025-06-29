import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string,
  content: string,
  publishedDate: string,
  id: string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-300 p-4">
      <div className="flex">
        <div className="">
          <Avatar size="big" name={authorName} />
        </div>
        <div className="font-light pl-2  text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
           <Circle/>
        </div>
        <div className="font-thin pl-2 text-gray-500 text-sm flex justify-center flex-col">
         {publishedDate}
        </div>
      </div>
      <div className="text-2xl font-semibold pt-2">
        {title}
      </div>
      <div className="text-md font-thin">
        {(content.length > 100) ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-slate-600 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
      
    </div>
    </Link>
  )
}

export function Avatar({ name, size= "small" }: { name: string, size: "small" | "big" }) {
  return <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-600 rounded-full ${size === 'small' ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === 'small' ? 'text-xs' : 'text-xl'}  text-gray-600 dark:text-gray-300`}>
      {name[0]}
    </span>
  </div>
}

export function Circle () {
  return <div className="h-1 w-1 rounded- bg-slate-500">

  </div>
}