import { useRef } from "react";

function ParentComment({ fileStructure, setFileStructure }) {
	const inputRef = useRef(null);

	function addNewEntity(type) {
		const inputComment = inputRef.current.value;
		if (inputComment) {
			setFileStructure((prevComments) => {
				return [
					...prevComments,
					{
						comment: inputComment,
						id: Math.random(),
						parentId: null,
						children: [],
						depth: 0,
						type,
					},
				];
			});
		}
		inputRef.current.value = "";
	}
	return (
		<div>
			<input ref={inputRef} />

			<button type="button" onClick={() => addNewEntity("FILE")}>
				{" "}
				Add File
			</button>
			<button type="button" onClick={() => addNewEntity("FOLDER")}>
				{" "}
				Add Folder
			</button>
		</div>
	);
}

export default ParentComment;
