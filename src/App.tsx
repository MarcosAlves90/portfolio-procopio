import "@/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ProjectPage from "@/pages/ProjectPage";
import HashNavigator from "@/components/HashNavigator";

function App() {
  return (
    <>
      <HashNavigator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/:id" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
