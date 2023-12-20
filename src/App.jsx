import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountyList/CountryList";
import cities from "./data/cities";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/PricingProduct/Pricing";
import Product from "./pages/PricingProduct/Product";
import AppLayout from "./pages/SavingPage/AppLayout";

export default function App() {
	const [cityList] = useState(cities);
	const [isLoading] = useState(false);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="product" element={<Product />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route
						index
						element={<CityList cityList={cityList} isLoading={isLoading} />}
					/>
					<Route
						path="cities"
						element={<CityList cityList={cityList} isLoading={isLoading} />}
					/>
					<Route path="cities/:cityId" element={<City />} />
					<Route
						path="countries"
						element={<CountryList cityList={cityList} isLoading={isLoading} />}
					/>
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
