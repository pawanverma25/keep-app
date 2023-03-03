import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { AddComponent } from "./components/AddComponent";
import ComponentInfo from "./components/ComponentInfo";

const App = () => {
	const onComponentPin = (componentId) => {
		const onComponentPinAsync = async () => {
			const response = await axios.put("/api/pin/", {
				_id: componentId,
			});
			setComponentList(response.data);
		};
		onComponentPinAsync();
	};
	const onComponentChange = (newComponent) => {
		const onComponentChangeAsync = async (newComponent) => {
			const response = await axios.put(`/api/edit/`, newComponent);
			setComponentList(response.data);
		};
		onComponentChangeAsync(newComponent);
	};
	const onDeleteComponent = (componentId) => {
		const onDeleteComponentAsync = async (componentId) => {
			const response = await axios.put(`/api/del/`, { _id: componentId });
			setComponentList(response.data);
		};
		onDeleteComponentAsync(componentId);
	};

	let [componentList, setComponentList] = useState([]);

	useEffect(() => {
		const fetchComponentList = async () => {
			let response = await axios.get("http://localhost:8000/");
			setComponentList(response.data);
		};
		fetchComponentList();
	}, []);

	return (
		<div className="container flex flex-wrap flex-col mx-auto px-5 mt-12">
			<AddComponent
				lastId={componentList.reduce(
					(max, item) => (Number(item._id) > max ? Number(item.id) : max),
					0
				)}
				onAddComponent={(newComponent) => {
					const onAddComponentAsync = async (newComponent) => {
						const response = await axios.put(`/api/add/`, newComponent);
						setComponentList(response.data);
					};
					onAddComponentAsync(newComponent);
				}}
			/>
			{componentList.map((component, index) => (
				<ComponentInfo
					key={component._id}
					component={component}
					onComponentChange={onComponentChange}
					onDeleteComponent={onDeleteComponent}
					onComponentPin={onComponentPin}
				/>
			))}
		</div>
	);
};

export default App;
