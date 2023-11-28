import { useState } from "react";
import ParentComment from "./ParentWidget";
import ChildWidget from "./ChildWidget";

function App(props) {
	const [fileStructure, setFileStructure] = useState([]);
	return (
		<div>
			<ParentComment
				fileStructure={fileStructure}
				setFileStructure={setFileStructure}
			/>
			<ChildWidget
				fileStructure={fileStructure}
				setFileStructure={setFileStructure}
			/>
		</div>
	);
}

export default App;
