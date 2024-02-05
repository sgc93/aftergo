// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import { useLocationCoords } from "../../hooks/useLocationCoords";
import BackButton from "../BackButton/BackButton";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./Form.module.css";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const [cityName, setCityName] = useState("");
	const [emoji, setEmoji] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [isReversingLoading, setIsReversingLoading] = useState(false);
	const [reversingError, setReversingError] = useState("");
	const { lat, lng } = useLocationCoords();

	useEffect(() => {
		if (!lat && !lng) return;
		async function reverseGeoLocation() {
			try {
				setIsReversingLoading(true);
				setReversingError("");
				const response = await fetch(
					`${BASE_URL}?latitude=${lat}&longitude=${lng}`
				);
				const data = await response.json();
				if (data.countryCode === "")
					throw new Error(
						"What you have selected is not a city, Click on other points please🫤"
					);
				setCityName(data.locality || data.city || "");
				setEmoji(data.countryCode);
			} catch (error) {
				setReversingError(error.message);
			} finally {
				setIsReversingLoading(false);
			}
		}
		reverseGeoLocation();
	}, [lat, lng]);

	if (isReversingLoading) return <Spinner />;
	if (!lat && !lng)
		return (
			<Message
				message={
					"Start by Searching the place you have visited and Clicking on it."
				}
			/>
		);
	if (reversingError) return <Message message={reversingError} />;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type={"primary"}>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
