import { AccordionData } from "./data";
import Accordion from "./Accordion";
import { useEffect, useState } from "react";

function AccordionWidget(props) {
	const [expandIndex, setShowExpandIndex] = useState(null);

	useEffect(() => {
		const timer = setInterval(() => {
			console.log("setInterval running");
			if (expandIndex < AccordionData.length - 1) {
				setShowExpandIndex((prevState) => prevState + 1);
			} else clearInterval(timer);
		}, 5000);

		return () => {
			clearInterval(timer);
		};
	}, [expandIndex]);

	function handleAccordionState(index) {
		setShowExpandIndex(index);
	}
	return (
		<div>
			<h1>Accordion</h1>
			{AccordionData.map((data, i) => {
				return (
					<Accordion
						expanded={expandIndex === i}
						index={i}
						setShowExpandIndex={handleAccordionState}
						key={data.id}
						header={data.header}
						content={data.content}
					/>
				);
			})}
		</div>
	);
}

export default AccordionWidget;
