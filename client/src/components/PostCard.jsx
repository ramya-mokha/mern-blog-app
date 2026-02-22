import React from "react";
import { format } from "date-fns";
import { Link } from "react-router";

const PostCard = ({
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
  _id,
}) => {
  return (
    <div className="flex gap-3 shadow-lg mt-4 h-50">
      <div className="w-80  h-50 shrink-0">
        <Link to={`/post/${_id}`} >
        <img src={`http://localhost:3000/uploads/${cover}`} alt="" className="w-full h-full object-cover rounded-lg"/>
        </Link>
      </div>
      <Link to={`/post/${_id}`}>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="font-light text-sm">{author.user}</span>
        <time
              dateTime="2026-02-02T16:45"
              className="font-light text-sm ml-1"
            >
              {format(new Date(createdAt), "dd MMM yyyy HH:mm")}
            </time>
            <div className="overflow-hidden overflow-ellipses mr-2 h-30">
              <span className="">
                {summary}

              </span>
            </div>
        </div>
        </Link>
    
    </div>
    
  );
};

export default PostCard;
