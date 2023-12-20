import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
	const [searchParams] = useSearchParams();
	const navigateTo = useNavigate();

	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div className={styles.mapContainer} onClick={() => navigateTo("form")}>
			positions: {lat}, {lng}
		</div>
	);
}
