import { useState } from "react";
import ParentComment from "./ParentWidget";
import ChildWidget from "./ChildWidget";

function App(props) {
	const [comments, setComments] = useState([]);
	return (
		<div>
			<ParentComment comments={comments} setComments={setComments} />
			<ChildWidget comments={comments} setComments={setComments} />
		</div>
	);
}

export default App;
