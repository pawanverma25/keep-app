import { useState } from "react";
import "./App.css";
import { AddComponent } from "./components/AddComponent";
import Navbar from "./components/Navbar";
import ComponentInfo from "./components/ComponentInfo";

function App() {
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
	let components = [
		{
			id: 0,
			type: "note",
			title: "how i got my wisdom tooth removed last christmas",
			pinned: false,
			date: "12/12/2012",
			time: "20:20",
			text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		},
		{
			id: 1,
			title: "1",
			type: "note",
			pinned: false,
			date: "12/12/2012",
			time: "20:20",
			text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		},
		{
			id: 2,
			type: "note",
			title: "2",
			pinned: false,
			date: "12/12/2012",
			time: "20:20",
			text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		},
		{
			id: 3,
			type: "note",
			title: "3",
			pinned: false,
			date: "12/12/2012",
			time: "20:20",
			text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		},
		{
			id: 4,
			type: "note",
			title: "4",
			pinned: true,
			date: "12/12/2012",
			time: "20:20",
			text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
		},
		{
			id: 10,
			type: "todo",
			title: "4",
			pinned: true,
			date: "12/12/2012",
			time: "20:20",
			list: [
				{
					text: "hehehe",
					done: false,
				},
				{
					text: "hehehe2",
					done: false,
				},
			],
		},
	];
	let [componentList, setComponentList] = useState(
		components.sort((a, b) => b.pinned - a.pinned)
	);
	return (
		<>
			<Navbar />
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
							onListChange={(todoId, todoList) => {
								const newComponentList = componentList.map((el) =>
									el.id === todoId ? { ...el, list: todoList } : el
								);
								setComponentList(newComponentList);
							}}
						/>
					))}
			</div>
		</>
	);
}

export default App;
