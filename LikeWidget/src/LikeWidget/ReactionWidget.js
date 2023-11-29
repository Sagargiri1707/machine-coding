import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "../Assets/icons";
import { ApiUtils } from "../Utils/apiUtils";

function App() {
	const [isLiked, setIsLiked] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	async function handleClick() {
		setShowLoader(true);
		const data = await ApiUtils();
		if (data === "SUCCESS") {
			setIsLiked(!isLiked);
		}
		setShowLoader(false);
	}
	return (
		<div>
			<button
				type="button"
				className={`button ${isLiked ? "buttonSuccess" : "buttonNormal"}`}
				onClick={handleClick}>
				{showLoader ? <SpinnerIcon /> : <HeartIcon />}
				<span>Like</span>
			</button>
		</div>
	);
}

export default App;
