import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
	const [error, setError] = useState("");
	const [position, setPosition] = useState(defaultPosition);
	const [isLoadingPosition, setIsLoadingPosition] = useState(false);

	function getPosition() {
		if (!navigator.geolocation) {
			return setError("Your browser does not support geolocation!");
		}

		setIsLoadingPosition(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
			},
			(error) => {
				setError(error.message);
				setIsLoadingPosition(false);
			}
		);
	}
	return { isLoadingPosition, position, error, getPosition };
}
