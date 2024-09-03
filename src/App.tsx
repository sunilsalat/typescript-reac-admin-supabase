import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyAdmin from "./pages/admin/admin";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/admin/*",
          element: <MyAdmin />,
          children: [],
        },
      ])}
    ></RouterProvider>
  );
}

export default App;
