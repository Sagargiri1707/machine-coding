import { useState } from "react";

const CONTROL_BUTTONS = ["-2", "-1", "+1", "+2"];
const HISTORY_TABS = ["Curr", "Prev", "Next"];
function CounterControls({ historyActions, undoEnabled, redoEnabled }) {
	function handleHistoryActions(actionType) {
		historyActions(actionType);
	}

	return (
		<div className="flex-center">
			<button
				type="button"
				onClick={() => handleHistoryActions("Undo")}
				disabled={undoEnabled}>
				{" "}
				Undo{" "}
			</button>
			<button
				type="button"
				onClick={() => handleHistoryActions("Redo")}
				disabled={redoEnabled}>
				{" "}
				Redo{" "}
			</button>
			<button type="button" onClick={() => handleHistoryActions("Reset")}>
				{" "}
				Reset{" "}
			</button>
		</div>
	);
}

function DisplayCounter({ counter, onButtonAction }) {
	return (
		<div className="flex-center mt-top">
			{CONTROL_BUTTONS.map((button, index) => {
				if (index === Math.floor(CONTROL_BUTTONS.length / 2)) {
					return (
						<div key={index}>
							{counter}
							<button
								type="button"
								onClick={() => onButtonAction(parseInt(button))}>
								{button}
							</button>
						</div>
					);
				}
				return (
					<button
						key={index}
						type="button"
						onClick={() => onButtonAction(parseInt(button))}>
						{button}
					</button>
				);
			})}
		</div>
	);
}
function CounterHistory({ history }) {
	return (
		<div>
			<div>History</div>

			<div className="flex-center">
				{HISTORY_TABS.map((tab) => (
					<span key={tab}>{tab}</span>
				))}
			</div>
			{history.map((itemEntry, index) => (
				<div key={index} className="flex-center">
					<span>{itemEntry.operation}</span>
					<span>{itemEntry.prevVal}</span>
					<span>{itemEntry.nextVal}</span>
				</div>
			))}
		</div>
	);
}
function Counter() {
	const [counterConfig, setCounterConfig] = useState({
		counterVal: 0,
		history: [],
	});
	const [historyOperations, setHistoryOperations] = useState([]);

	function onButtonAction(operation) {
		setCounterConfig((prevConfig) => {
			return {
				...prevConfig,
				counterVal: prevConfig.counterVal + operation,
				history: [
					...[
						{
							operation,
							prevVal: prevConfig.counterVal,
							nextVal: prevConfig.counterVal + operation,
						},
					].concat(...prevConfig.history.slice()),
				],
			};
		});
	}
	function historyActions(type) {
		if (type === "Undo") {
			const historyClone = counterConfig.history.slice();
			const undoedItem = historyClone.shift();
			console.log(undoedItem);
			setCounterConfig((prevConfig) => {
				return {
					...prevConfig,
					counterVal: undoedItem.prevVal,
					history: historyClone,
				};
			});
			setHistoryOperations((prevConfig) => prevConfig.concat(undoedItem));
		}
		if (type === "Redo") {
			const historyClone = counterConfig.history.slice();
			const historyOperationsClone = historyOperations.slice();
			const redoedItem = historyOperationsClone.pop();
			historyClone.unshift(redoedItem);
			setCounterConfig((prevConfig) => {
				return {
					...prevConfig,
					counterVal: redoedItem.nextVal,
					history: historyClone,
				};
			});
			setHistoryOperations(historyOperationsClone);
		}
		if (type === "Reset") {
			setCounterConfig({
				counterVal: 0,
				history: [],
			});
			setHistoryOperations([]);
		}
	}
	return (
		<div className="flex-row containerWidth">
			<div>Counter</div>
			<CounterControls
				historyActions={historyActions}
				undoEnabled={!(counterConfig.history.length > 0)}
				redoEnabled={!(historyOperations.length > 0)}
			/>
			<DisplayCounter
				counter={counterConfig.counterVal}
				onButtonAction={onButtonAction}
			/>
			<CounterHistory history={counterConfig.history} />
		</div>
	);
}

export default Counter;
