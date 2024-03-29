import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useLocationCoords } from "../../hooks/useLocationCoords";
import Button from "../Button/Button";
import styles from "./Map.module.css";
export default function Map() {
	const [cityPosition, setCityPosition] = useState([
		11.596431998275062, 37.400317557806964,
	]);
	const { cityList } = useCities();
	const { lat: mapLat, lng: mapLng } = useLocationCoords();
	const {
		isLoadingPosition,
		position: currentPos,
		getPosition,
	} = useGeolocation();

	useEffect(() => {
		if (mapLat && mapLng) setCityPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (currentPos) setCityPosition(currentPos);
	}, [currentPos]);

	// const position = [11.596431998275062, 37.400317557806964];

	return (
		<div className={styles.mapContainer}>
			{!currentPos && (
				<Button type={"position"} onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use Current Position"}
				</Button>
			)}
			<MapContainer
				center={cityPosition}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cityList &&
					cityList.map((city) => {
						return (
							<Marker
								position={[city.position.lat, city.position.lng]}
								key={city.id}
							>
								<Popup>
									<span>{city.emoji}</span>
									<span>{city.cityName}</span>
								</Popup>
							</Marker>
						);
					})}
				<ChangeMapCenter position={cityPosition} />
				<DetectMapInteraction />
			</MapContainer>
		</div>
	);
}

function ChangeMapCenter({ position }) {
	const view = useMap();
	view.setView(position);
	return null;
}

function DetectMapInteraction() {
	const navigateTo = useNavigate();
	useMapEvents({
		click: (e) => {
			navigateTo(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}
