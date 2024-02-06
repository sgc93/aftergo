import { useEffect, useReducer } from "react";
import CitiesContext from "./CitiesContex";

const BASE_URL = "http://localhost:9000";
const ACTIONS = {
	LOADING: "loading",
	STOP_LOADING: "un_loading",
	LOAD_CITY: "cities/loaded",
	DELETE_CITY: "cities/deleted",
	CREATE_CITY: "cities/created",
	LOAD_LOCATION: "city/loaded",
	REJECTED: "rejected",
};

const initialState = {
	cityList: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(currentState, action) {
	switch (action.type) {
		case ACTIONS.LOADING:
			return { ...currentState, isLoading: true };
		case ACTIONS.STOP_LOADING:
			return { ...currentState, isLoading: false };
		case ACTIONS.LOAD_CITY:
			return {
				...currentState,
				cityList: action.payload,
			};
		case ACTIONS.CREATE_CITY:
			return {
				...currentState,
				cityList: [...currentState.cityList, action.payload],
				currentCity: action.payload,
			};
		case ACTIONS.DELETE_CITY:
			return {
				...currentState,
				cityList: currentState.cityList.filter(
					(city) => city.id !== action.payload
				),
				currentCity: {},
			};
		case ACTIONS.LOAD_LOCATION:
			return {
				...currentState,
				currentCity: action.payload,
			};
		case ACTIONS.REJECTED:
			return { ...currentState, error: action.payload };
		default:
			throw new Error("😒undetected action type!");
	}
}
function CitiesContextProvider({ children }) {
	const [{ cityList, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);
	// const [cityList, setCityList] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	// loading city list from the server
	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: ACTIONS.LOADING });
			try {
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				dispatch({ type: ACTIONS.LOAD_CITY, payload: data });
			} catch (error) {
				dispatch({
					type: ACTIONS.REJECTED,
					payload: "there was an error while loading data ...",
				});
			} finally {
				dispatch({ type: ACTIONS.STOP_LOADING });
			}
		}
		fetchCities();
	}, []);

	// add newly visited city the city list
	async function addNewCity(newVisitedCity) {
		dispatch({ type: ACTIONS.LOADING });
		try {
			const response = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newVisitedCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const newCity = await response.json();
			dispatch({ type: ACTIONS.CREATE_CITY, payload: newCity });
		} catch (error) {
			dispatch({
				type: ACTIONS.REJECTED,
				payload:
					"there was an error while posting this city data to the server.",
			});
		} finally {
			dispatch({ type: ACTIONS.STOP_LOADING });
		}
	}

	// delete a city from the city list
	async function deleteCity(id) {
		dispatch({ type: ACTIONS.LOADING });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: ACTIONS.DELETE_CITY, payload: id });
		} catch (error) {
			dispatch({
				type: ACTIONS.REJECTED,
				payload:
					"there was an error while deleting this city data from the server.",
			});
		} finally {
			dispatch({
				type: ACTIONS.STOP_LOADING,
			});
		}
	}

	// get the current location city data
	async function getCity(id) {
		dispatch({ type: ACTIONS.LOADING });
		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const cityData = await response.json();
			dispatch({ type: ACTIONS.LOAD_LOCATION, payload: cityData });
		} catch (error) {
			dispatch({
				type: ACTIONS.REJECTED,
				payload: "there was an error while loading this city data ...",
			});
		} finally {
			dispatch({ type: ACTIONS.STOP_LOADING });
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cityList,
				isLoading,
				currentCity,
				error,
				getCity,
				addNewCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export default CitiesContextProvider;
