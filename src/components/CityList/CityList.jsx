import CityItem from "../CityItem/CityItem";
import styles from "./CityList.module.css";
export default function CityList({ cityList, isLoading }) {
	return (
		<ul className={styles.cityList}>
			{cityList.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}
