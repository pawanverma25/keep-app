import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { RiDeleteBin2Fill, RiSave2Fill } from "react-icons/ri";
import "../App.css";

export const FormNote = ({ note, setNote }) => {
	return (
		<div className="p-1 flex flex-col h-fit">
			<textarea
				name="title"
				className="resize-none overflow-hidden whitespace-pre-wrap mt-3 px-2 text-xl font-semibold bg-inherit focus:outline-none border-b-2 border-[#76abe8] h-[1.76rem]"
				placeholder="Title"
				value={note.title}
				onClick={(e) => (e.target.style.height = `${e.target.scrollHeight}px`)}
				onChange={(e) => {
					e.target.style.height = `${e.target.scrollHeight}px`;
					setNote({ ...note, title: e.target.value });
				}}></textarea>
			<textarea
				name="note"
				type="text"
				placeholder="Your Note..."
				className="mt-2 bg-inherit p-2 min-h-fit focus:outline-none resize-none overflow-hidden whitespace-pre-wrap"
				value={note.text}
				onClick={(e) => (e.target.style.height = `${e.target.scrollHeight}px`)}
				onChange={(e) => {
					e.target.style.height = `${e.target.scrollHeight}px`;
					setNote({ ...note, text: e.target.value });
				}}></textarea>
		</div>
	);
};

export const FormTodo = ({ todo, setTodo }) => {
	let [listItemText, setListItemText] = useState("");

	return (
		<div className="p-1 flex flex-col h-fit">
			<textarea
				name="title"
				className="mt-3 px-2 text-xl font-semibold bg-inherit focus:outline-none border-b-2 border-[#76abe8] resize-none overflow-hidden whitespace-pre-wrap h-[1.76rem]"
				placeholder="Title"
				value={todo.title}
				onClick={(e) => (e.target.style.height = `${e.target.scrollHeight}px`)}
				onChange={(e) => {
					e.target.style.height = `${e.target.scrollHeight}px`;
					setTodo({ ...todo, title: e.target.value });
				}}></textarea>
			<ul className="flex flex-col my-4 mx-auto marker:text-gray-400 marker:text-2xl list-disc">
				{todo.list.map((item, index) => (
					<li className="bg-transparent border-b-2 border-[#76abe8] my-2">
						<button
							type="button"
							className="m-1 p-1 rounded-lg hover:bg-[#fba0a0] bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min mr-2"
							onClick={() => {
								const newTodoList = [...todo.list];
								newTodoList.splice(index, 1);
								setTodo({ ...todo, list: newTodoList });
							}}>
							<RiDeleteBin2Fill
								size={12}
								className=" text-[#408de6] hover:text-[#ff0000]"
							/>
						</button>
						<p className="font-semibold inline">{item.text}</p>
					</li>
				))}
				<li className="bg-transparent border-b-2 border-[#76abe8] my-2">
					<input
						className="font-semibold lg:w-[400px] md:w-[300px] sm:w-[200px] bg-inherit focus:outline-none mr-2"
						placeholder="list item..."
						value={listItemText}
						onChange={(e) => {
							setListItemText(e.target.value);
						}}></input>
					<button
						type="button"
						className="bg-[#76abe8] rounded-md py-1 px-2 mr-1 ml-auto select-none focus:outline-none"
						onClick={(e) => {
							if (listItemText === "") return;
							setTodo({
								...todo,
								list: todo.list.concat([{ text: listItemText, done: false }]),
							});
							setListItemText("");
						}}>
						<RiSave2Fill color="white" />
					</button>
				</li>
			</ul>
		</div>
	);
};

export const AddComponent = ({ onAddComponent }) => {
	const clearComponent = {
		type: "note",
		title: "",
		pinned: false,
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
			type: formType,
			title: component.title,
			pinned: false,
			date: new Date(new Date().getTime() + 330 * 60 * 1000),
		};
		if (formType === "note")
			newComponent = { ...newComponent, text: component.text };
		else newComponent = { ...newComponent, list: component.list };
		onAddComponent(newComponent);
		setComponent(clearComponent);
		setFormType("note");
		setToggleForm(!toggleForm);
	};

	return (
		<div className="flex flex-col lg:w-[700px] lg:p-0 md:w-[600px] md:p-0 sm:w-[500px] sm:p-0 w-[100%] px-4 mb-2 justify-center mx-auto">
			<button
				type="button"
				className={`Note-Width flex w-[100%] h-10 bg-[#76abe8] mx-auto justify-center select-none focus:outline-none hover:scale-105 ${
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
								className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-[#76abe8] border-4 appearance-none cursor-pointer focus:outline-none"
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
