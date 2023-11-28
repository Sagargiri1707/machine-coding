import ControlPanel from "./ControlPanel";

function ChildWidget({ comments, setComments }) {
	return (
		<div>
			{comments.map((comment) => {
				return (
					<div key={comment.id}>
						<ControlPanel
							comment={comment}
							setComments={setComments}
							edit={true}
							deleteComm={true}
							reply={true}
							comments={comments}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default ChildWidget;
