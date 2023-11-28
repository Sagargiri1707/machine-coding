import { useRef, useState } from "react";

function editFileGlobally(state, editedComment) {
	for (let i = 0; i < state.length; i++) {
		if (state[i].id === editedComment.id) {
			state[i].comment = editedComment.comment;
		}
		if (state[i].children.length > 0) {
			state[i].children = editFileGlobally(state[i].children, editedComment);
		}
	}

	return state;
}

function deleteEntityGlobally(state, id) {
	for (let i = 0; i < state.length; i++) {
		if (state[i].id === id) {
			state.splice(i, 1);
			break;
		}
		if (state[i].children.length > 0) {
			state[i].children = deleteEntityGlobally(state[i].children, id);
		}
	}

	return state;
}

function addEntityGlobally(state, newComment) {
	for (let i = 0; i < state.length; i++) {
		if (state[i].id === newComment.parentId) {
			state[i].children.push(newComment);
		}
		if (state[i].children.length > 0) {
			state[i].children = addEntityGlobally(state[i].children, newComment);
		}
	}
	return state;
}
function ControlPanel({
	comment,
	fileStructure,
	setFileStructure,
	edit,
	deleteComm,
	reply,
}) {
	const [isEditable, setIsEditable] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [newEntityType, setNewEntityType] = useState("FILE");
	const replyInputRef = useRef(null);
	const [error, setError] = useState(null);
	const [newComment, setNewComment] = useState(comment.comment);
	function editButton() {
		setIsEditable(!isEditable);
	}
	function handleEditComment(e) {
		setNewComment(e.target.value);
	}

	function editComment() {
		if (!newComment) return;
		setIsEditable(!isEditable);

		setFileStructure(
			editFileGlobally([...fileStructure], {
				...comment,
				comment: newComment,
			})
		);
	}
	function deleteComment() {
		setFileStructure(deleteEntityGlobally([...fileStructure], comment.id));
	}

	function replyToComment(filetype) {
		setNewEntityType(filetype);
		setIsReplying(!isReplying);
	}
	function submitReply() {
		setIsReplying(!isReplying);
		const reply = replyInputRef.current.value;
		const regex = new RegExp(`\.(js|css|jsx|html)$`);
		if (regex.test(reply) || newEntityType === "FOLDER") {
			setFileStructure(
				addEntityGlobally([...fileStructure], {
					comment: reply,
					id: Math.random(),
					parentId: comment.id,
					children: [],
					depth: comment.depth + 1,
					type: newEntityType,
				})
			);
			replyInputRef.current.value = "";
		} else {
			setError("unsopprted file type provided");
			setTimeout(() => {
				setError("");
			}, 1000);
		}
	}
	return (
		<div style={{ paddingLeft: `${comment.depth * 20}px`, marginTop: "10px" }}>
			{error && (
				<span style={{ font: "red", background: "red" }}>{error} </span>
			)}
			<div style={{ display: "flex" }}>
				{!isEditable ? (
					<div>
						<span style={{ background: "pink" }}>{comment.type}</span>
						{"  "}
						{comment.comment}
					</div>
				) : (
					<input
						value={newComment}
						onBlur={editComment}
						onChange={handleEditComment}
					/>
				)}

				{edit && (
					<button type="button" onClick={editButton}>
						Edit
					</button>
				)}

				{deleteComm && (
					<button
						style={{ marginLeft: "6px" }}
						type="button"
						onClick={deleteComment}>
						delete
					</button>
				)}
				{isReplying && (
					<input
						style={{ marginLeft: "6px" }}
						onBlur={submitReply}
						ref={replyInputRef}
					/>
				)}
				{reply && comment.type === "FOLDER" && (
					<button
						style={{ marginLeft: "6px" }}
						type="button"
						onClick={() => replyToComment("FILE")}>
						Add File
					</button>
				)}
				{reply && comment.type === "FOLDER" && (
					<button
						style={{ marginLeft: "6px" }}
						type="button"
						onClick={() => replyToComment("FOLDER")}>
						Add Folder
					</button>
				)}
			</div>
			{comment.children.map((replies) => {
				return (
					<ControlPanel
						key={replies.id}
						comment={replies}
						setFileStructure={setFileStructure}
						edit={true}
						deleteComm={true}
						reply={true}
						fileStructure={fileStructure}
					/>
				);
			})}
		</div>
	);
}

export default ControlPanel;
