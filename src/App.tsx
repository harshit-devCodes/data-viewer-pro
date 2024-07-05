import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import DataViewer from "./pages/data-viewer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-viewer" element={<DataViewer />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
