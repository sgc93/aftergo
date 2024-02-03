import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountyList/CountryList";
import Form from "./components/Form/Form";
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
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate replace to={"cities"} />} />
					<Route path="cities" element={<CityList />} />
					<Route path="cities/:cityId" element={<City />} />
					<Route path="countries" element={<CountryList />} />
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
