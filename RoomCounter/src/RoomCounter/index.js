import { useState } from "react";
import RoomContainer from "./RoomContainer";
import SideBar from "./Sidebar";
import { RoomState } from "./constants";
function RoomCounter() {
	const [availableState, setAvailableState] = useState({
		roomData: new Array(30).fill().map((a, id) => {
			const status = Math.random() > 0.5;
			const credits = Math.floor(Math.random() * 100);
			return {
				id,
				name: "room " + id,
				status,
				credits: credits ? credits : 1,
			};
		}),
		userData: {
			availableCredits: 150,
			bookedRooms: [],
		},
	});

	function bookRoom(roomData) {
		setAvailableState((prevState) => {
			return {
				...prevState,
				userData: {
					availableCredits:
						prevState.userData.availableCredits - roomData.credits,
					bookedRooms: [...prevState.userData.bookedRooms, roomData],
				},
			};
		});
	}
	return (
		<div className="room-cotainer-wrapper">
			<RoomContainer
				roomData={availableState.roomData}
				creditsAvailable={availableState.userData.availableCredits}
				bookRoom={bookRoom}
			/>
			<SideBar userData={availableState.userData} />
		</div>
	);
}

export default RoomCounter;
