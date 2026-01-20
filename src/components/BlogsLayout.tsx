import { Outlet, useMatch } from "react-router-dom";
import BlogList from "./BlogList";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, PanelLeft, PanelRight } from "lucide-react";
import { useEffect } from "react";

const BlogsLayout = () => {
  const isDetailPage = useMatch("/blogs/:id");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    () => !isDetailPage,
  );
  useEffect(() => {
    setIsSidebarOpen(!isDetailPage);
  }, [isDetailPage]);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="h-screen overflow-hidden">
      <div className="md:hidden p-4 bg-dark flex justify-between items-center z-50 transition-transform duration-300">
        <Button variant={"outline"} onClick={toggleSidebar}>
          {isSidebarOpen ? <PanelRight /> : <PanelLeft />}
        </Button>
      </div>

      <div className={`flex justify-center gap-6  `}>
        <aside
          className={`
              fixed inset-y-0 left-0 w-[85vw] h-dvh
    z-50 bg-dark overflow-y-auto
    transition-transform duration-300 shadow-md shadow-black rounded-xl

    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

    md:static md:translate-x-0 md:w-auto
    md:m-4 md:shadow-none

    ${
      isDetailPage
        ? "md:w-[clamp(16rem,28vw,25rem)]"
        : "md:w-[clamp(28rem,64vw,72rem)]"
    }
          `}
        >
          <BlogList />
        </aside>

        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
        {isDetailPage && (
          <main
            className={`  inset-0 z-0 bg-white
              md:static md:z-auto md:flex-1
              overflow-y-auto h-screen `}
          >
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};

export default BlogsLayout;
