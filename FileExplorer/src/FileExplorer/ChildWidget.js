import ControlPanel from "./ControlPanel";

function ChildWidget({ fileStructure, setFileStructure }) {
	return (
		<div>
			{fileStructure.map((comment) => {
				return (
					<div key={comment.id}>
						<ControlPanel
							comment={comment}
							setFileStructure={setFileStructure}
							edit={true}
							deleteComm={true}
							reply={true}
							fileStructure={fileStructure}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default ChildWidget;
