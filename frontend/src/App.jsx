import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ChatroomPage from "./pages/ChatroomPage";
import chatroomLoader from "./util/chatroomLoader";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import adminLoader from "./util/adminLoader";

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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "register",
            element: <LoginPage />,
          },
        ],
        loader: adminLoader,
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
