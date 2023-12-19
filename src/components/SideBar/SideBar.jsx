import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
import styles from "./Sidebar.module.css";

export default function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<Outlet />

			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()}, by AfterGO Inc.
				</p>
			</footer>
		</div>
	);
}
