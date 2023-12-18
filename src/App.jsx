import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="product" element={<Product />} />
				<Route path="homepage" element={<HomePage />} />
				<Route path="pricing" element={<Pricing />} />
			</Routes>
		</BrowserRouter>
	);
}
