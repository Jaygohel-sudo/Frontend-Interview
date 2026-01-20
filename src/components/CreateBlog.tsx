import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { useCreateBlog } from "@/hooks/useBlogs";

const CreateBlog = () => {
  const { mutate, isPending, isError } = useCreateBlog();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    mutate(
      {
        title: form.title,
        description: form.description,
        content: form.content,
        category: form.category.split(",").map((c) => c.trim()),
      },
      {
        onSuccess: (createdBlog) => {
          navigate(`/blogs/${createdBlog.id}`);
        },
      },
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Create Blog</h1>

      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <Input
        name="category"
        placeholder="Category (comma separated)"
        value={form.category}
        onChange={handleChange}
      />

      <Textarea
        name="description"
        placeholder="Short description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <Textarea
        name="content"
        placeholder="Blog content"
        rows={8}
        value={form.content}
        onChange={handleChange}
        required
      />

      <div className="flex gap-4">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Publishing..." : "Publish"}
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateBlog;
