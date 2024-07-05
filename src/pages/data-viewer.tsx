import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Posts from "../components/posts";
import Department from "../components/department";

const DataViewer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
      toast.error("Please login before accessing the data viewer page");
    }
  }, [navigate]);
  return (
    <Box sx={{ p: 5 }}>
      <h1>Posts</h1>
      <Posts />
      <h1 style={{ marginTop: "25px" }}>Department</h1>
      <Department />
    </Box>
  );
};

export default DataViewer;
