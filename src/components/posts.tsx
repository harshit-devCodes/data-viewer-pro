import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";

interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  // state to save the post data
  const [postsData, setPostsData] = useState<PostsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch data
  const fetchPosts = () => {
    try {
      setIsLoading(true);
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => setPostsData(data));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch data when page loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // columns config
  const columns: GridColDef<PostsType>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 500,
      editable: true,
    },
    {
      field: "body",
      headerName: "Content",
      width: 700,
      editable: true,
    },
  ];

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={450} />;
  }

  return (
    <DataGrid
      sx={{ marginTop: 2 }}
      rows={postsData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
};

export default Posts;
