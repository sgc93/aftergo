import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../../hooks/useCities";
import styles from "./Map.module.css";
export default function Map() {
	const { cityList, cityPosition } = useCities();
	const navigateTo = useNavigate();
	// const [searchParams] = useSearchParams();

	// const lat = searchParams.get("lat");
	// const lng = searchParams.get("lng");

	// const position = [11.596431998275062, 37.400317557806964];

	return (
		<div className={styles.mapContainer} onClick={() => navigateTo("form")}>
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
				{cityList.map((city) => {
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
			</MapContainer>
		</div>
	);
}
