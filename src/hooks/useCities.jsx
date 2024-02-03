import { useContext } from "react";
import CitiesContext from "../contexts/CitiesContex";

export function useCities() {
	const contextValues = useContext(CitiesContext);
	if (contextValues === undefined)
		throw new Error(
			"useCities is being used outside citiesContextProvider scope!"
		);
	return contextValues;
}
