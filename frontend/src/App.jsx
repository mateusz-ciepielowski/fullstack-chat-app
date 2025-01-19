import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ChatroomPage from "./pages/ChatroomPage";
import chatroomLoader from "./util/chatroomLoader";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: ":chatroom",
        element: <ChatroomPage />,
        loader: chatroomLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
