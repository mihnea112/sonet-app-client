import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Content from "./home/Content";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Content />,
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
