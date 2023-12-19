import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/PricingProduct/Pricing";
import Product from "./pages/PricingProduct/Product";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
