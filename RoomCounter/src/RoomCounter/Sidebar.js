function SideBar({ userData }) {
	return (
		<div className="sidebar">
			SideBar
			<div>
				<span> Available Credits</span> :{" "}
				<span>{userData.availableCredits}</span>
			</div>
			<div>
				{userData.bookedRooms.map((bookedRooms) => {
					return (
						<div key={bookedRooms.id}>
							{" "}
							{bookedRooms.name} : {bookedRooms.credits}{" "}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SideBar;
