import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City/City";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountyList/CountryList";
import Form from "./components/Form/Form";
import AuthContextProvider from "./contexts/AuthContextProvider";
import CitiesContextProvider from "./contexts/citiesContextProvider";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/PricingProduct/Pricing";
import Product from "./pages/PricingProduct/Product";
import ProtectedComponents from "./pages/ProtectedComponents";
import AppLayout from "./pages/SavingPage/AppLayout";

export default function App() {
	return (
		<CitiesContextProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="login" element={<Login />} />
						<Route
							path="app"
							element={
								<ProtectedComponents>
									<AppLayout />
								</ProtectedComponents>
							}
						>
							<Route index element={<Navigate replace to={"cities"} />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthContextProvider>
		</CitiesContextProvider>
	);
}
