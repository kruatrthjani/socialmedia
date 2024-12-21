import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import App from '../App';
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Bookmarks from "../components/middle/Bookmark";
import HomePage from "../components/middle/Homepage";
import PostDetail from "../components/Detail/postDetail";
import UserDetail from "../components/Detail/userDetail";
import { path } from "./navigatepath";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes
      {
        path: "/",
        element: <PublicRouter />,
        children: [
          {
            path: path.LOGIN,
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      // Private routes for authenticated users
      {
        path: path.HOME,
        element: <PrivateRouter />,
        children: [
          {
            path: "",
            element: <Home />,
            children: [
              {
                path: "",
                element: <HomePage />,
              },
              {
                path: path.EXPLORE,
                element: <HomePage />,
              },
              {
                path: path.BOOKMARK,
                element: <Bookmarks />,
              },
            ],
          },
        ],
      },

      // Global Post Detail route
      {
        path: path.POSTDETAIL,
        element: <PostDetail />,
      },
      {
        path:path.USEERDETAIL,
        element:<UserDetail/>
      }
    ],
  },
]);

export default router;
