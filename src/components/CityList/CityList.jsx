import { useCities } from "../../hooks/useCities";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
export default function CityList() {
	const { cityList, isLoading } = useCities();

	if (isLoading) return <Spinner />;
	if (!cityList.length)
		return (
			<Message
				message={"Add your first city by clicking on a city on the map."}
			/>
		);
	return (
		<ul className={styles.cityList}>
			{cityList.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}
