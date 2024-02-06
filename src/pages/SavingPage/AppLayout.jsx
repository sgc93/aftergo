import Map from "../../components/Map/Map";
import SideBar from "../../components/SideBar/SideBar";
import User from "../../components/User/User";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
	const { user } = useAuth();
	return (
		<div className={styles.app}>
			<SideBar />
			<Map />
			{user && <User />}
		</div>
	);
}
