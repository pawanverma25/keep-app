import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route
				path="/"
				element={<App />}
			/>
		</Routes>
	</BrowserRouter>
);
