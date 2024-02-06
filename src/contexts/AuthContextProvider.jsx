import { useReducer } from "react";
import AuthContext from "./AuthContext";

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};
const ACTIONS = {
	LOGIN: "login",
	LOGOUT: "logout",
};

const initialState = {
	user: null,
	isAuthenticated: false,
};

function reducer(currentState, action) {
	switch (action.type) {
		case ACTIONS.LOGIN:
			return { ...currentState, user: action.payload, isAuthenticated: true };
		case ACTIONS.LOGOUT:
			return { ...currentState, user: null, isAuthenticated: false };
		default:
			throw new Error("undefined action was attempt!");
	}
}

function AuthContextProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({
				type: ACTIONS.LOGIN,
				payload: FAKE_USER,
			});
		}
	}

	function logout() {
		dispatch({ type: ACTIONS.LOGOUT });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
