import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";

export default function CountryList({ cityList, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cityList.length) {
		return (
			<Message
				message={"Add your first Country by clicking on a Country on the map."}
			/>
		);
	}

	const countryList = cityList.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji }];
		} else {
			return arr;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countryList.map((ctry) => (
				<CountryItem country={ctry} key={ctry.country} />
			))}
		</ul>
	);
}
