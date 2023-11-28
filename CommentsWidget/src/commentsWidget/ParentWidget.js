import { useRef } from "react";

function ParentComment({ comments, setComments }) {
	const inputRef = useRef(null);

	function addParentComment() {
		const inputComment = inputRef.current.value;
		if (inputComment) {
			setComments((prevComments) => {
				return [
					...prevComments,
					{
						comment: inputComment,
						id: Math.random(),
						parentId: null,
						children: [],
						depth: 0,
					},
				];
			});
		}
		inputRef.current.value = "";
	}
	return (
		<div>
			<input ref={inputRef} />

			<button type="button" onClick={addParentComment}>
				{" "}
				Add Comments{" "}
			</button>
		</div>
	);
}

export default ParentComment;
