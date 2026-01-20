import { useBlogById } from "@/hooks/useBlogs";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";

const BlogById = () => {
  const { id } = useParams();
  const { data, isPending } = useBlogById(Number(id));

  if (isPending) return <p className="text-white/60">Loading…</p>;
  if (!data) return <p className="text-white/60">Blog not found</p>;

  const date = new Date(data.date);

  return (
    <div className="p-6 md:p-10">
      <Card className="bg-linear-to-br from-light to-dark inset-ring-4 inset-ring-dark rounded-2xl overflow-hidden shadow-md shadow-black">
        <CardHeader className="p-0">
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-[280px] md:h-[380px] object-cover"
          />
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-between text-xs text-white/50 tracking-wide">
            <span>{data.category.join(", ")}</span>
            <span>
              {date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex justify-end text-xs text-muted-foreground">
            {date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-white/90 text-shadow-lg">
            {data.title}
          </h1>

          <p className="text-white/60 text-lg leading-relaxed">
            {data.description}
          </p>

          <div className="text-white/80 leading-relaxed whitespace-pre-line">
            {data.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogById;
