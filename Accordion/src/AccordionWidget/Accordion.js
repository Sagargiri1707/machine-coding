import { useEffect, useState } from "react";

function Accordion({ header, content, setShowExpandIndex, index, expanded }) {
	function showAccordion() {
		setShowExpandIndex(index);
	}

	function Loader() {
		const [progress, setProgress] = useState(100);
		useEffect(() => {
			simulateLoading();
		}, []);
		const simulateLoading = () => {
			let currentProgress = 100;
			const interval = setInterval(() => {
				currentProgress -= 1;
				setProgress(currentProgress);
				if (currentProgress === 0) {
					clearInterval(interval);
				}
			}, 50);
		};
		return <div className="loader" style={{ width: `${progress}%` }} />;
	}
	return (
		<div onClick={showAccordion} className="widgetWrapper">
			<div className="header">{header} </div>
			{expanded && <Loader key={index} />}
			{<div className={expanded ? "widgetShow" : "widgetHide"}>{content}</div>}
		</div>
	);
}

export default Accordion;
