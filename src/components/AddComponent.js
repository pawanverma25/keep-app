import { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import "../App.css";

const AddComponent = ({ lastId, onAddComponent }) => {
	const clearNote = {
		id: -1,
		type: "note",
		title: "",
		pinned: false,
		date: "",
		time: "",
		text: "",
	};

	let [toggleForm, setToggleForm] = useState(false);
	let [note, setNote] = useState(clearNote);

	const publishNote = () => {
		if (note.text === "" && note.title === "") return;
		const newNote = {
			id: lastId + 1,
			type: "note",
			title: note.title,
			pinned: false,
			date: new Date().toLocaleDateString("en-IN"),
			time: new Date().toLocaleTimeString("en-IN", {
				hour12: false,
				hour: "numeric",
				minute: "numeric",
			}),
			text: note.text,
		};
		onAddComponent(newNote);
		setNote(clearNote);
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
							className="rounded-md mt-2 bg-inherit p-2 font-medium min-h-fit focus:outline-none resize-none overflow-hidden"
							value={note.text}
							onChange={(e) => {
								e.target.style.height = `${e.target.scrollHeight}px`;
								setNote({ ...note, text: e.target.value });
							}}></textarea>
					</div>
					<button
						type="button"
						className="bg-[#76abe8] text-white hover:scale-105 hover:shadow-md rounded-md py-1 px-3 my-2 mr-1 ml-auto"
						onClick={publishNote}>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default AddComponent;
