import { useRef, useState } from "react";
import Config from "./config";

function Widget({ config, grow }) {
	if (config.slotType === "WIDGET") {
		return (
			<div
				style={{
					display: "flex",
					height: "200px",
					width: "100%",
					overflow: "hidden",
					flex: `${grow ? grow : ""}`,
					position: "relative",
				}}>
				{(config || []).assets.map((asset) => (
					<div style={{ display: "flex", flex: `${config.grow}` }}>
						<img
							style={{ height: "100%", width: "100%" }}
							src={asset["imageUrl"]}
						/>
					</div>
				))}
			</div>
		);
	} else if (config.slotType === "CONTAINER") {
		return (
			<div
				className="container"
				style={{
					display: "flex",
					height: "200px",
					width: "100%",
					overflow: "hidden",
				}}>
				{config.children.map((config, id) => (
					<Widget config={config} key={id} grow={config.grow} />
				))}
			</div>
		);
	}

	return <div></div>;
}

function HolyGrail() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}>
			{Config.map((config, id) => {
				return <Widget config={config} key={id} />;
			})}
		</div>
	);
}

export default HolyGrail;
