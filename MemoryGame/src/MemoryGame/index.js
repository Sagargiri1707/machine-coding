import { useState, useRef } from "react";
const emojis = [
	"🐵",
	"🐶",
	"🦊",
	"🐱",
	"🦁",
	"🐯",
	"🐴",
	"🦄",
	"🦓",
	"🦌",
	"🐮",
	"🐷",
	"🐭",
	"🐹",
	"🐻",
	"🐨",
	"🐼",
	"🐽",
	"🐸",
	"🐰",
	"🐙",
];

const width = 4;
const timer = 1000;
function generateInitState(emojis, len) {
	const randomizedArr = emojis.slice().sort(() => 0.5 - Math.random());
	const numberOfEmojis = (len * len) / 2;
	const randomEmojis = randomizedArr.slice(0, numberOfEmojis);
	return [...randomEmojis, ...randomEmojis].sort(() => 0.5 - Math.random());
}

function MemoryGame() {
	const [boardState, setBoardState] = useState(
		generateInitState(emojis, width)
	);
	const [trackClick, setTrackClick] = useState([]);
	const [matchedEntity, setMatchedEntity] = useState(new Set());
	const timerRef = useRef(null);
	function handleClick(item, i) {
		if (matchedEntity.has(i)) return;
		if (trackClick.length >= 2 || trackClick.includes(i)) return;
		const newState = trackClick.concat(i);
		if (newState.length === 2) {
			if (boardState[newState[0]] === boardState[newState[1]]) {
				console.log("matched");
				const matchedEntities = new Set(matchedEntity);
				matchedEntities.add(newState[0]);
				matchedEntities.add(newState[1]);
				setMatchedEntity(matchedEntities);
				setTrackClick([]);
				return;
			} else {
				setTrackClick(newState);
				timerRef.current = setTimeout(() => {
					setTrackClick([]);
					clearTimeout(timerRef.current);
				}, timer);
				return;
			}
		}
		setTrackClick(newState);
	}
	function resetGame() {
		setBoardState(generateInitState(emojis, width));
		setMatchedEntity(new Set());
		setTrackClick([]);
	}
	return (
		<div>
			<div
				className="board-layout"
				style={{
					gridTemplateColumns: `repeat(${width}, var(--size))`,
					gridTemplateRows: `repeat(${width}, var(--size))`,
				}}>
				{boardState.map((item, i) => {
					const isMatched = matchedEntity.has(i) || trackClick.includes(i);
					return (
						<div
							key={i}
							className={`board-item ${
								!matchedEntity.has(i) ? "flipped" : "unflipped"
							}`}
							onClick={() => handleClick(item, i)}>
							{isMatched ? item : ""}
						</div>
					);
				})}
			</div>
			{matchedEntity.size === width * width && (
				<button type="button" onClick={resetGame}>
					PLAY AGAIN
				</button>
			)}
		</div>
	);
}

export default MemoryGame;
