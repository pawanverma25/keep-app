import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { AddComponent } from "./components/AddComponent";
import ComponentInfo from "./components/ComponentInfo";

const App = () => {
	const onComponentPin = (componentId) => {
		const newComponentList = componentList
			.map((note) =>
				note.id === componentId
					? { ...note, pinned: !note.pinned }
					: { ...note }
			)
			.sort((a, b) => b.pinned - a.pinned);
		setComponentList(newComponentList);
	};
	const onComponentChange = (index, newComponent) => {
		const newComponentList = [...componentList];
		newComponentList.splice(index, 1);
		setComponentList([newComponent, ...newComponentList]);
	};
	const onDeleteComponent = (componentId) => {
		setComponentList(
			componentList.filter((curNote) => curNote.id !== componentId)
		);
	};
	const onListChange = (todoId, todoList) => {
		const newComponentList = componentList.map((el) =>
			el.id === todoId ? { ...el, list: todoList } : el
		);
		setComponentList(newComponentList);
	};

	let [componentList, setComponentList] = useState([]);

	useEffect(() => {
		const fetchComponentList = async () => {
			let response = await axios.get("http://localhost:8000/");
			setComponentList(response.data);
		};
		fetchComponentList();
	}, []);

	useEffect(() => {
		const postComponentList = async () => {
			await axios.post("http://localhost:8000/", componentList);
		};
		postComponentList();
	}, [componentList]);

	return (
		<div className="container flex flex-wrap flex-col mx-auto px-5 mt-12">
			<AddComponent
				lastId={componentList.reduce(
					(max, item) => (Number(item.id) > max ? Number(item.id) : max),
					0
				)}
				onAddComponent={(newNote) => {
					setComponentList(
						[newNote, ...componentList].sort((a, b) => b.pinned - a.pinned)
					);
				}}
			/>
			{componentList
				.sort((a, b) => b.pinned - a.pinned)
				.map((component, index) => (
					<ComponentInfo
						key={component.id}
						index={index}
						component={component}
						onComponentChange={onComponentChange}
						onDeleteComponent={onDeleteComponent}
						onComponentPin={onComponentPin}
						onListChange={onListChange}
					/>
				))}
		</div>
	);
};

export default App;
