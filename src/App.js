import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Content from "./home/Content";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dash from "./dash/Dash";
import About from "./home/About";
import axios from "axios";
import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Edit from "./dash/edit/Edit";
import SonetLg from "./dash/SonetLg";
import SonetFromId from "./dash/SonetFromId";
import ForMe from "./dash/ForMe";

export function getProxyy() {
	return process.env.REACT_APP_DEVPROXY;
}

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				light: "#6ee7b7",
				main: "#6ee7b7",
				dark: "#6ee7b7",
				contrastText: "#6ee7b7",
			},
			delete: {
				light: "#ef4444",
				main: "#ef4444",
				dark: "#ef4444",
				contrastText: "#ef4444",
			},
		},
	});

	const [logged, setLogged] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.get(getProxyy() + "/user?token=" + token).then((res) => {
				setLogged(true);
				console.log(res.data);
			});
		} else setLogged(false);
	}, []);

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
			element: <About />,
		},
		{
			path: "/register",
			element: <Register />,
		},
		{
			path: "/dash",
			element: <Dash />,
		},
		{
			path: "/for-me",
			element: <ForMe />,
		},
		{
			path: "/sonet/:id",
			element: <SonetFromId />,
		},
	]);
	return (
		<>
			<ThemeProvider theme={theme}>
				<Navbar></Navbar>
				<div className="min-h-screen bg-zinc-700">
					<RouterProvider router={router}></RouterProvider>
				</div>
				<Footer></Footer>
			</ThemeProvider>
		</>
	);
}
export default App;
