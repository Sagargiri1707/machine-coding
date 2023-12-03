import { useState, useRef, useEffect } from "react";
import { SIDES } from "./constants";
function Lists({ list, index, handleItemState }) {
	const inputRef = useRef(null);
	const [selectAll, setSelectAll] = useState(
		Array.from(list.values()).filter(Boolean).length == list.size
	);
	useEffect(() => {
		setSelectAll(
			Array.from(list.values()).filter(Boolean).length === list.size
		);
	});
	function handleItemInputChange(e) {
		if (!inputRef.current.value) return;
		handleItemState(inputRef.current.value, index, "ADD");
		inputRef.current.value = "";
	}
	function handleItemCheck(e) {
		handleItemState(e.target.value, index, "EDIT");
	}
	function handleGlobalSelect() {
		if (selectAll) {
			setSelectAll(false);
			handleItemState("", index, "GLOBAL_DESELECT");
		} else {
			handleItemState("", index, "GLOBAL_SELECT");
		}
	}
	return (
		<div className="list">
			<input ref={inputRef} onBlur={handleItemInputChange} />
			<div></div>
			{list.size > 0 && (
				<>
					<input
						type="checkbox"
						checked={selectAll}
						onChange={handleGlobalSelect}
						id={index + "_globalSelect"}
					/>
					<label htmlFor={`${index}_globalSelect`}> Select all</label>
				</>
			)}
			{Array.from(list.entries()).map(([value, checked], id) => {
				return (
					<div key={id}>
						<input
							type="checkbox"
							id={"_" + index + "_" + value}
							checked={checked}
							onChange={handleItemCheck}
							value={value}
						/>
						<label htmlFor={"_" + index + "_" + value}> {value} </label>
					</div>
				);
			})}
		</div>
	);
}

function ControlButtons({
	handleItemTransition,
	currentIndex,
	currList,
	nextList,
}) {
	function computeDisabilityNext() {
		return (
			Array.from(currList.values()).filter((a) => !Boolean(a)).length ==
			currList.size
		);
	}
	function computeDisabilityPrev() {
		return (
			Array.from(nextList.values()).filter((a) => !Boolean(a)).length ==
			nextList.size
		);
	}
	return (
		<div
			style={{
				margin: "10px",
			}}>
			<button
				onClick={() => handleItemTransition(currentIndex + 1, currentIndex)}
				type="button"
				disabled={computeDisabilityPrev()}>
				{"<"}
			</button>
			<button
				onClick={() => handleItemTransition(currentIndex, currentIndex + 1)}
				type="button"
				disabled={computeDisabilityNext()}>
				{">"}
			</button>
		</div>
	);
}

function TransferList() {
	const [listsMap, setListMap] = useState(
		Array(SIDES)
			.fill("")
			.map((_) => new Map())
	);

	function handleItemState(value, index, type) {
		const updatedState = [...listsMap];
		const updatedStateMap = new Map(updatedState[index]);
		if (type === "ADD") updatedStateMap.set(value, false);
		else if (type === "EDIT")
			updatedStateMap.set(value, !updatedStateMap.get(value));
		else if (type === "GLOBAL_SELECT" || type === "GLOBAL_DESELECT") {
			for (let [val, checked] of updatedStateMap.entries()) {
				updatedStateMap.set(val, type === "GLOBAL_SELECT" ? true : false);
			}
		}
		setListMap([
			...listsMap.slice(0, index),
			updatedStateMap,
			...listsMap.slice(index + 1),
		]);
	}
	function handleItemTransition(fromIndex, toIndex) {
		const updatedState = [...listsMap];
		const updatedStateMapLeft = new Map(updatedState[fromIndex]);
		const updatedStateMapRight = new Map(updatedState[toIndex]);
		Array.from(updatedState[fromIndex].entries()).forEach(([key, val]) => {
			if (val) {
				updatedStateMapLeft.delete(key);
				updatedStateMapRight.set(key, val);
			}
		});
		if (fromIndex > toIndex)
			setListMap([
				...listsMap.slice(0, toIndex),
				updatedStateMapRight,
				...listsMap.slice(toIndex + 1, fromIndex),
				updatedStateMapLeft,
				...listsMap.slice(fromIndex + 1),
			]);
		else if (fromIndex < toIndex) {
			setListMap([
				...listsMap.slice(0, fromIndex),
				updatedStateMapLeft,
				...listsMap.slice(fromIndex + 1, toIndex),
				updatedStateMapRight,
				...listsMap.slice(toIndex + 1),
			]);
		}
	}
	return (
		<div>
			{SIDES}
			<h2>TransferList</h2>
			<div className="list-wrapper">
				{listsMap.map((list, index) => {
					return (
						<div className="styles-flex-center" key={index}>
							<Lists
								list={list}
								index={index}
								handleItemState={handleItemState}
							/>
							{index !== listsMap.length - 1 && (
								<ControlButtons
									currList={listsMap[index]}
									nextList={listsMap[index + 1]}
									currentIndex={index}
									handleItemTransition={handleItemTransition}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default TransferList;
