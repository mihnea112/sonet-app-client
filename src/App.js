import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Content from "./home/Content";
import Login from "./auth/Login";
import Register from "./auth/Register";

export function getProxyy() {
  return process.env.REACT_APP_DEVPROXY;
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Content />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/despre",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-zinc-700">
        <RouterProvider router={router}></RouterProvider>
      </div>
      <Footer></Footer>
    </>
  );
}
export default App;
