import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import { BlogCardSkeleton } from "./BlogListSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
const BlogList = () => {
  const { id } = useParams();
  const activeId = Number(id);
  const { data, isPending } = useBlogs();
  const navigate = useNavigate();

  return (
    <div className=" flex-col  bg-linear-to-br from-light to-dark p-8 inset-ring-8 inset-ring-dark rounded-xl ">
      {isPending ? (
        <div className="grid gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <button
            onClick={() => navigate("/blogs/new")}
            className="
          flex items-center justify-center gap-2
          rounded-lg border border-white/20
          bg-white/5 hover:bg-white/10
          p-3 text-white
        "
          >
            <Plus size={18} />
            Create Blog
          </button>
          {data?.map((blog) => {
            const isActive = Number(blog.id) === activeId;

            return (
              <Card
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className={`cursor-pointer shadow-lg shadow-white/40 border-2 border-solid border-white/30 bg-linear-to-r from-cardLight to-cardDark  ${
                  isActive ? "outline-4 outline-white outline-offset-4" : ""
                }`}
              >
                <CardHeader className="flex-col pb-0">
                  <div className="flex justify-between w-full  tracking-wide text-xs text-white/50">
                    <span>{blog.category.join(", ")}</span>
                    <span className="text-right">
                      {new Date(blog.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-end text-xs text-muted-foreground leading-tight">
                    <span>
                      {new Date(blog.date).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-2xl text-white/90 pb-2 text-shadow-lg ">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-md text-white/50 line-clamp-2">
                    {blog.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogList;
