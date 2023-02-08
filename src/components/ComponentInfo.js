import "../index.css";
import {
	RiDeleteBin2Fill,
	RiEdit2Fill,
	RiPushpinFill,
	RiPushpinLine,
} from "react-icons/ri";
import { useRef, useState } from "react";

const TodoListComponent = ({ component, onListChange }) => {
	let [todoList, setTodoList] = useState(component.list);
	let dragItem = useRef();
	let dragOverItem = useRef();

	const dragStart = (e, position) => {
		dragItem.current = position;
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	};

	const drop = (e) => {
		const copyListItems = [...todoList];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		setTodoList(copyListItems);
		onListChange(component.id, copyListItems);
	};

	return (
		<>
			{component.list.map((todo, index) => (
				<div
					onDragStart={(e) => dragStart(e, index)}
					onDragEnter={(e) => dragEnter(e, index)}
					onDragEnd={drop}
					className="form-check"
					draggable>
					<input
						className="form-check-input peer appearance-none h-4 w-4 border border-[#408de6] rounded-sm bg-[#c2ddfc] checked:bg-[#408de6] checked:bg- focus:outline-none checked:line-through transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
						type="checkbox"
						value=""
						id="CheckBox"
					/>
					<label
						className="form-check-label inline-block text-gray-800 peer-checked:line-through"
						htmlFor="CheckBox">
						{todo.text}
					</label>
				</div>
			))}
		</>
	);
};

const ComponentInfo = ({
	component,
	onDeleteComponent,
	onComponentPin,
	onListChange,
}) => {
	let [pinned, setPinned] = useState(component.pinned);
	return (
		<div className="flex flex-col mx-auto">
			<div className="flex min-h-10 lg:w-[700px] md:w-[600px] sm:w-[500px] mx-5 mt-2 px-4 py-2 bg-[#76abe8] rounded-t-md shadow-lg justify-between">
				<h1 className="flex-[2_0_0%] text-xl font-semibold text-white my-auto text-ellipsis overflow-hidden">
					{component.title}
				</h1>
				<button
					type="button"
					className="m-1 p-1 rounded-lg bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min"
					onClick={() => {
						setPinned(!pinned);
						onComponentPin(component.id);
					}}>
					{pinned ? (
						<RiPushpinFill color="#408de6" />
					) : (
						<RiPushpinLine color="#408de6" />
					)}
				</button>
				<button
					type="button"
					className="m-1 p-1 rounded-lg bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min"
					onClick={() => {}}>
					<RiEdit2Fill color="#408de6" />
				</button>
				<button
					type="button"
					onClick={() => onDeleteComponent(component.id)}
					className="m-1 p-1 rounded-lg bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min">
					<RiDeleteBin2Fill color="#408de6" />
				</button>
			</div>
			<div className="NoteDiv flex flex-col min-h-[4rem] lg:w-[700px] md:w-[600px] sm:w-[500px] mx-5 mb-5 overflow-y-scroll px-3 py-1 rounded-b-md shadow-xl bg-[#ccd4de]">
				{component.type === "note" ? (
					component.text
						.split("\n")
						.map((text) => <p className="float-none">{text}</p>)
				) : (
					<TodoListComponent
						component={component}
						onListChange={onListChange}
					/>
				)}
				<h3 className="p-1 text-xs text-[#0359c9] font-semibold inline ml-auto mt-auto">
					Last edited: {component.date} {component.time}
				</h3>
			</div>
		</div>
	);
};
export default ComponentInfo;
