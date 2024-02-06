import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedComponents({ children }) {
	const { isAuthenticated } = useAuth();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigateTo("/");
		}
	}, [isAuthenticated, navigateTo]);

	return isAuthenticated ? children : null;
}

export default ProtectedComponents;
