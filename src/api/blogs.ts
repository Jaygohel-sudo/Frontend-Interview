const BASE_URL = "http://localhost:3001";
type blog = {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};
export const getBlogs = async (): Promise<blog[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${BASE_URL}/blogs`);
  if (!response.ok) throw new Error("Failed to fetch blogs.");
  return await response.json();
};

export const getBlogById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`);

  if (!response.ok) throw new Error("Failed to fetch the blog.");
  return await response.json();
};

export type CreateBlogPayload = {
  title: string;
  description: string;
  content: string;
  category: string[];
};

export async function createBlog(payload: CreateBlogPayload) {
  const res = await fetch("http://localhost:3001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      date: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
}
