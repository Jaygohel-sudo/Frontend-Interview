import { getBlogs, getBlogById, createBlog } from "@/api/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

export const useBlogById = (id: number) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });
};
export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      // Refresh blog list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
