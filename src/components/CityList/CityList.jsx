import cities from "../../data/cities";
import styles from "./CityList.module.css";
export default function CityList() {
	console.log(cities);
	return <div className={styles.cityList}>CityList</div>;
}
