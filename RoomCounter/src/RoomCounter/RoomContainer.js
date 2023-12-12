import { RoomContainerWidth } from "./constants";

function Room({ roomDetail, creditsAvailable, bookRoom }) {
	function handleRoomBook() {
		bookRoom(roomDetail);
	}
	return (
		<div className="room">
			<div>{roomDetail.name}</div>
			<div>{roomDetail.status ? "Available" : "Booked"}</div>
			<div>
				{roomDetail.status &&
					(creditsAvailable > roomDetail.credits ? (
						<>
							<div> Credits : {roomDetail.credits}</div>
							<button type="button" onClick={handleRoomBook}>
								{" "}
								Book{" "}
							</button>
						</>
					) : (
						<span style={{ color: "white" }}>Not enough credits to book</span>
					))}
			</div>
		</div>
	);
}

function RoomContainer({ roomData, creditsAvailable, bookRoom }) {
	return (
		<div>
			RoomContainer
			<div
				className="room-container"
				style={{
					gridTemplateColumns: `repeat(${RoomContainerWidth}, 160px)`,
					gridTemplateRows: `repeat(
						${Math.ceil(roomData.length / RoomContainerWidth) + 1},
						160px
					)`,
				}}>
				{roomData.map((room) => {
					return (
						<Room
							roomDetail={room}
							key={room.id}
							creditsAvailable={creditsAvailable}
							bookRoom={bookRoom}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RoomContainer;
