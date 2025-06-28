
interface BlogCardProps {
  authorName: string;
  title: string,
  content: string,
  publishedDate: string
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return (
    <div className="border border-slate-300 pb-4">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="font-light pl-2 px-1">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
           <Circle/>
        </div>
        <div className="font-thin px-2 text-gray-500">
         {publishedDate}
        </div>
      </div>
      <div className="text-2xl font-semibold">
        {title}
      </div>
      <div className="text-md font-thin">
        {(content.length > 100) ? content.slice(0, 100) + "..." : content}
      </div>
      <div className="text-slate-600 text-sm font-thin">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
      
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-600 rounded-full ">
    <span className="text-xs text-gray-600 dark:text-gray-300">
      {name[0]}
    </span>
  </div>
}

function Circle () {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}