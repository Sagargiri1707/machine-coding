import { useRef, useState } from "react";

function addOrUpdateEntity(
	entities,
	rootEntity,
	newEntityName,
	isParentInput,
	method,
	type,
	entityInfo
) {
	let updatedEntities = { ...entities };
	let updatedRootEntity = [...rootEntity];
	if (method === "ADD") {
		const entityId = Math.random();
		const newEntity = {
			id: entityId,
			parentId: isParentInput ? "root" : entityInfo.id,
			children: [],
			depth: isParentInput ? 0 : entityInfo.depth + 10,
			type,
			name: newEntityName,
		};
		updatedEntities[entityId] = newEntity;
		if (!isParentInput) {
			updatedEntities[entityInfo.id] = {
				...updatedEntities[entityInfo.id],
				children: [...updatedEntities[entityInfo.id].children, entityId],
			};
		}

		if (isParentInput) {
			updatedRootEntity.push(entityId);
		}
	} else if (method === "EDIT") {
		updatedEntities[entityInfo.id] = {
			...updatedEntities[entityInfo.id],
			name: newEntityName,
		};
	} else if (method === "DELETE") {
		if (entityInfo.parentId === "root") {
			updatedRootEntity = updatedRootEntity.filter((a) => {
				return a !== entityInfo.id;
			});
		} else {
			const parentEntity = updatedEntities[entityInfo.parentId];
			parentEntity.children = parentEntity.children.filter(
				(a) => a !== entityInfo.id
			);
		}
		delete updatedEntities[entityInfo.id];
	}
	return {
		entities: updatedEntities,
		rootEntity: updatedRootEntity,
	};
}

function ControlPanel({
	entities,
	rootEntity,
	updateParentEntity,
	isParentInput,
	showEditButton,
	showDeleteButton,
	showFolderInput,
	showFileInput,
	entityInfo,
}) {
	const addEntityRef = useRef(null);
	const editEntityRef = useRef(null);
	const [entityType, setEntityType] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [error, setError] = useState("");
	const [showChild, setShowChild] = useState(true);
	function addEntity() {
		const newEntityName = addEntityRef.current.value;
		const regex = new RegExp(`\.(js|css|jsx|html|json)$`);
		if (entityType === "FILE" && !regex.test(newEntityName)) {
			setError("incorrect file extension");
			setTimeout(() => {
				setError("");
			}, 2000);
			setEntityType("");
			setIsEdit(false);
			return;
		}

		updateParentEntity(
			addOrUpdateEntity(
				entities,
				rootEntity,
				newEntityName,
				isParentInput,
				"ADD",
				entityType,
				entityInfo
			)
		);
		addEntityRef.current.value = "";
		setEntityType("");
	}

	function editEntity() {
		const editedEntityName = editEntityRef.current.value;
		const regex = new RegExp(`\.(js|css|jsx|html|json)$`);
		if (entityInfo.type === "FILE" && !regex.test(editedEntityName)) {
			setError("incorrect file extension");
			setTimeout(() => {
				setError("");
			}, 2000);
			setEntityType("");
			setIsEdit(false);
			return;
		}
		updateParentEntity(
			addOrUpdateEntity(
				entities,
				rootEntity,
				editedEntityName,
				isParentInput,
				"EDIT",
				entityType,
				entityInfo
			)
		);
		editEntityRef.current.value = "";
		setIsEdit(false);
	}

	function deleteEntity() {
		updateParentEntity(
			addOrUpdateEntity(
				entities,
				rootEntity,
				"",
				isParentInput,
				"DELETE",
				entityType,
				entityInfo
			)
		);
	}
	return (
		<div
			style={{
				paddingLeft: `${entityInfo.depth + 10}px`,
				marginTop: "10px",
			}}>
			{isParentInput && <span>Root</span>}

			{Object.keys(entityInfo).length > 0 && (
				<span
					style={{ cursor: "pointer" }}
					onClick={() => {
						if (entityInfo.type === "FOLDER") setShowChild(!showChild);
					}}>
					{entityInfo.type === "FOLDER" && (showChild ? "->" : "V  ")}
					{entityInfo.type} :{entityInfo.name}
				</span>
			)}
			{entityType ? (
				<>
					<input ref={addEntityRef} onBlur={addEntity} />
				</>
			) : (
				<>
					{showFileInput && (
						<button type="button" onClick={() => setEntityType("FILE")}>
							Add file
						</button>
					)}
					{showFolderInput && (
						<button type="button" onClick={() => setEntityType("FOLDER")}>
							Add folder
						</button>
					)}
				</>
			)}
			{isEdit ? (
				<input ref={editEntityRef} onBlur={editEntity} />
			) : (
				<>
					{showEditButton && (
						<button type="button" onClick={() => setIsEdit(true)}>
							Edit
						</button>
					)}
					{showDeleteButton && (
						<button type="button" onClick={deleteEntity}>
							Delete
						</button>
					)}
				</>
			)}

			<span style={{ color: "red", paddingLeft: "10px" }}>
				{error && error}
			</span>

			{showChild &&
				Object.keys(entityInfo).length > 0 &&
				entityInfo.children.map((childIds) => {
					const entityData = entities[childIds];
					return (
						<ControlPanel
							key={entityData.id}
							entityInfo={entityData}
							entities={entities}
							rootEntity={rootEntity}
							updateParentEntity={updateParentEntity}
							isParentInput={false}
							showFileInput={entityData.type === "FOLDER"}
							showFolderInput={entityData.type === "FOLDER"}
							showEditButton={true}
							showDeleteButton={true}
						/>
					);
				})}
		</div>
	);
}

export default ControlPanel;
