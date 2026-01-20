import { Navigate, Route, Routes } from "react-router-dom";
import BlogById from "./components/BlogById";
import BlogsLayout from "./components/BlogsLayout";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" replace />} />
      <Route path="/blogs" element={<BlogsLayout />}>
        <Route path="new" element={<CreateBlog />} />
        <Route path=":id" element={<BlogById />} />
      </Route>
    </Routes>
  );
};

export default App;
