import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/PricingProduct/Pricing";
import Product from "./pages/PricingProduct/Product";
import AppLayout from "./pages/SavingPage/AppLayout";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="appLayout" element={<AppLayout />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
