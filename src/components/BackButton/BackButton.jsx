import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function BackButton() {
	const navigateTo = useNavigate();
	return (
		<Button
			onClick={(e) => {
				e.preventDefault();
				navigateTo(-1);
			}}
			type={"back"}
		>
			&larr;
		</Button>
	);
}

export default BackButton;
