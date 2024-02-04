import { useEffect, useState } from "react";
import CitiesContext from "./CitiesContex";

const BASE_URL = "http://localhost:9000";
function CitiesContextProvider({ children }) {
	const [cityList, setCityList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});
	const [cityPosition, setCityPosition] = useState([
		11.596431998275062, 37.400317557806964,
	]);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCityList(data);
			} catch (error) {
				alert("there was an error while loading data ...");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const cityData = await response.json();
			setCurrentCity(cityData);
		} catch (error) {
			alert("there was an error while loading this city data ...");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cityList,
				isLoading,
				currentCity,
				setCurrentCity,
				getCity,
				cityPosition,
				setCityPosition,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export default CitiesContextProvider;
