import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 600 },
];

const Component1 = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={posts} columns={columns} />
    </div>
  );
};

export default Component1;
