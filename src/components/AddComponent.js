import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import "../App.css";

const FormNote = ({ note, setNote }) => {
	return (
		<div className="p-1 flex flex-col h-fit">
			<input
				name="title"
				className="rounded-md mt-3 px-2 text-xl font-semibold bg-inherit focus:outline-none"
				placeholder="Title"
				value={note.title}
				onChange={(e) => {
					setNote({ ...note, title: e.target.value });
				}}></input>
			<textarea
				name="note"
				type="text"
				placeholder="Your Note.."
				className="rounded-md mt-2 bg-inherit p-2 font-medium min-h-fit focus:outline-none resize-none overflow-hidden whitespace-pre-wrap"
				value={note.text}
				onChange={(e) => {
					e.target.style.height = `${e.target.scrollHeight}px`;
					setNote({ ...note, text: e.target.value });
				}}></textarea>
		</div>
	);
};

const FormTodo = ({ todo, setTodo }) => {
	return (
		<div className="p-1 flex flex-col h-fit">
			<input
				name="title"
				className="rounded-md mt-3 px-2 text-xl font-semibold bg-inherit focus:outline-none"
				placeholder="Title"
				value={todo.title}
				onChange={(e) => {
					setTodo({ ...todo, title: e.target.value });
				}}></input>
		</div>
	);
};

const AddComponent = ({ lastId, onAddComponent }) => {
	const clearComponent = {
		id: -1,
		type: "note",
		title: "",
		pinned: false,
		date: "",
		time: "",
		text: "",
		list: [],
	};

	let [toggleForm, setToggleForm] = useState(false);
	let [formType, setFormType] = useState("note");
	let [component, setComponent] = useState(clearComponent);
	const publishComponent = (formType) => {
		if (
			component.text === "" &&
			component.title === "" &&
			component.list === []
		)
			return;
		let newComponent = {
			id: lastId + 1,
			type: formType,
			title: component.title,
			pinned: false,
			date: new Date().toLocaleDateString("en-IN"),
			time: new Date().toLocaleTimeString("en-IN", {
				hour12: false,
				hour: "numeric",
				minute: "numeric",
			}),
		};
		if (formType === "note")
			newComponent = { ...newComponent, text: component.text };
		else newComponent = { ...newComponent, list: component.list };
		onAddComponent(newComponent);
		setComponent(clearComponent);
		setToggleForm(!toggleForm);
	};

	return (
		<div className="flex flex-col lg:w-[700px] lg:p-0 md:w-[600px] md:p-0 sm:w-[500px] sm:p-0 w-[100%] px-4 hover:scale-105 mb-2 justify-center mx-auto">
			<button
				type="button"
				className={`Note-Width flex w-[100%] h-10 bg-[#76abe8] mx-auto justify-center select-none focus:outline-none ${
					toggleForm ? "rounded-t-lg" : "rounded-lg"
				} shadow-xl`}
				onClick={() => setToggleForm(!toggleForm)}>
				<MdPlaylistAdd
					size={40}
					color="white"
				/>
			</button>
			{toggleForm && (
				<div className="w-[100%] h-fit mx-auto rounded-b-lg shadow-xl bg-[#ccd4de] px-4 flex flex-col">
					<div className="flex justify-center mx-auto my-4">
						<h1 className="font-bold text-2xl mx-4 text-gray-500">Note</h1>
						<div className="my-auto relative inline-block w-10 align-middle select-none transition duration-1000 ease-in">
							<input
								type="checkbox"
								name="toggle"
								id="toggle"
								className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-[#76abe8] border-4 appearance-none cursor-pointer"
								onClick={() => {
									if (formType === "note") setFormType("todo");
									else setFormType("note");
									setComponent({ ...component, type: formType });
								}}
							/>
							<label
								htmlFor="toggle"
								className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer bg-slate-400"></label>
						</div>
						<h1 className="font-bold text-2xl mx-4 text-gray-500">Todo</h1>
					</div>
					{formType === "note" ? (
						<FormNote
							note={component}
							setNote={setComponent}
						/>
					) : (
						<FormTodo
							todo={component}
							setTodo={setComponent}
						/>
					)}
					<button
						type="button"
						className="bg-[#76abe8] text-white hover:scale-105 hover:shadow-md rounded-md py-1 px-3 my-2 mr-1 ml-auto"
						onClick={() => {
							publishComponent(formType);
						}}>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default AddComponent;
