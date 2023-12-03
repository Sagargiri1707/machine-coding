import { useState } from "react";
import ControlPanel from "./ControlPanel";

function FileExplorer() {
	const [parentEntity, setParentEntity] = useState({
		entities: {},
		rootEntity: [],
	});
	return (
		<div>
			<ControlPanel
				entities={parentEntity.entities}
				entityInfo={{}}
				rootEntity={parentEntity.rootEntity}
				updateParentEntity={setParentEntity}
				isParentInput={true}
				showFileInput={true}
				showFolderInput={true}
				showEditButton={false}
				showDeleteButton={false}
			/>
			{parentEntity.rootEntity.map((entity) => {
				const entityInfo = parentEntity.entities[entity];
				return (
					<ControlPanel
						key={entityInfo.id}
						entityInfo={entityInfo}
						entities={parentEntity.entities}
						rootEntity={parentEntity.rootEntity}
						updateParentEntity={setParentEntity}
						isParentInput={false}
						showFileInput={entityInfo.type === "FOLDER"}
						showFolderInput={entityInfo.type === "FOLDER"}
						showEditButton={true}
						showDeleteButton={true}
					/>
				);
			})}
		</div>
	);
}

export default FileExplorer;
