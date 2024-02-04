import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
	const [searchParams] = useSearchParams();
	const navigateTo = useNavigate();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	const position = [11.596431998275062, 37.400317557806964];

	return (
		<div className={styles.mapContainer} onClick={() => navigateTo("form")}>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
