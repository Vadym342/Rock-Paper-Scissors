import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { Home } from "../pages/Home/Home";
import { Auth } from "../pages/Auth/Auth";
import { UserList } from "../components/UserList/UserList";
import { Profile } from "../components/Profile/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { Lobby } from "../pages/Lobby/Lobby";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "lobby",
        element: <Lobby />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UserList listOfUsers={[]} />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
