import { useState } from "react";
import Star from "../assets/star";
import { STAR_COUNT } from "../config";

function StarWidget() {
	const starStatus = Array(STAR_COUNT).fill(true);

	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);

	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
	};

	const handleStarHover = (hoveredRating) => {
		setHoveredRating(hoveredRating);
	};

	const handleStarHoverExit = () => {
		setHoveredRating(0);
	};
	return (
		<div>
			<div style={{ display: "flex" }}>
				{starStatus.map((_, id) => (
					<Star
						status={id >= (hoveredRating || rating)}
						onMouseOver={() => handleStarHover(id + 1)}
						onMouseLeave={() => handleStarHoverExit(id + 1)}
						onClick={() => handleStarClick(id + 1)}
						key={id}
					/>
				))}
			</div>
			{rating > 0 && rating}
		</div>
	);
}

export default StarWidget;
