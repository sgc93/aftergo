import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// use custom hook for consuming the provided context values
export function useAuth() {
	const authValues = useContext(AuthContext);
	if (authValues === undefined) {
		return "😒this context was used outside its scope.";
	}

	return authValues;
}
