import { useState } from "react";
import cities from "../data/cities";
import CitiesContext from "./CitiesContex";

function CitiesContextProvider({ children }) {
	const [cityList] = useState(cities);
	const [isLoading] = useState(false);

	return (
		<CitiesContext.Provider
			value={{
				cityList,
				isLoading,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export default CitiesContextProvider;
