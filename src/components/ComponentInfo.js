import "../index.css";
import {
	RiDeleteBin2Fill,
	RiEdit2Fill,
	RiPushpinFill,
	RiPushpinLine,
} from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormNote, FormTodo } from "./AddComponent";

const TodoListComponent = ({ component, onListChange }) => {
	let [todoList, setTodoList] = useState(component.list);

	const onDragEnd = (result) => {
		if (!result.destination) return;
		const [dragItemContent] = todoList.splice(result.source.index, 1);
		todoList.splice(result.destination.index, 0, dragItemContent);
		onListChange(component._id, [...todoList]);
		setTodoList([...todoList]);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="todolist">
				{(provided) => (
					<ul
						className="todolist min-h-fit w-[100%] select-none"
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{todoList.map((todo, index) => {
							return (
								<Draggable
									key={component._id + "-" + index}
									draggableId={component._id + "-" + index}
									index={index}>
									{(provided) => (
										<li
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="form-check flex mx-2 mt-1 p-1 items-center rounded-sm bg-[#76abe85c]">
											<RxDragHandleDots2
												size={26}
												className="text-gray-400"
											/>
											<input
												className="form-check-input peer appearance-none h-4 w-4 border border-[#408de6] rounded-sm bg-[#c2ddfc] checked:bg-[#408de6] checked:bg- focus:outline-none checked:line-through transition duration-200 bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
												type="checkbox"
												id={"CheckBox" + component._id + "-" + index}
												defaultChecked={todo.done}
												onClick={(e) => {
													const newComponentList = [...component.list];
													newComponentList[index] = {
														...todo,
														done: e.target.checked,
													};
													setTodoList(newComponentList);
													onListChange(component._id, newComponentList);
												}}
											/>
											<label
												className="form-check-label peer-checked:line-through text-lg mr-5"
												htmlFor="CheckBox">
												{todo.text}
											</label>
											<button
												type="button"
												className="group m-1 p-1 rounded-lg hover:bg-[#fba0a0] bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min ml-auto"
												onClick={() => {
													todoList.splice(index, 1);
													onListChange(component._id, todoList);
												}}>
												<RiDeleteBin2Fill
													size={12}
													className=" text-[#408de6] group-hover:text-[#ff0000]"
												/>
											</button>
										</li>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

const ComponentInfo = ({
	component,
	onComponentChange,
	onDeleteComponent,
	onComponentPin,
	onListChange,
}) => {
	let [pinned, setPinned] = useState(component.pinned);
	let [beingEdited, setBeingEdited] = useState(false);
	let [comp, setComp] = useState(component);

	if (beingEdited)
		return (
			<div className="flex flex-col mx-auto lg:w-auto md:w-auto sm:w-auto w-full">
				<div className="NoteDiv flex flex-col min-h-[4rem] lg:w-[700px] md:w-[600px] sm:w-[500px] mx-5 mb-5 overflow-y-scroll px-3 py-1 rounded-md shadow-xl bg-[#ccd4de]">
					{comp.type === "note" ? (
						<FormNote
							note={comp}
							setNote={setComp}
						/>
					) : (
						<FormTodo
							todo={comp}
							setTodo={setComp}
						/>
					)}
					<button
						type="button"
						className="bg-[#76abe8] text-white hover:scale-105 hover:shadow-md rounded-md py-1 px-3 my-2 mr-1 ml-auto"
						onClick={() => {
							const newComponent = {
								...comp,
								date: new Date().toLocaleDateString("en-IN"),
								time: new Date().toLocaleTimeString("en-IN", {
									hour12: false,
									hour: "numeric",
									minute: "numeric",
								}),
							};
							onComponentChange(newComponent);
							setBeingEdited(false);
						}}>
						Submit
					</button>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col mx-auto lg:w-auto md:w-auto sm:w-auto w-full">
			<div className="flex min-h-10 lg:w-[700px] md:w-[600px] sm:w-[500px] mx-5 mt-2 px-4 py-2 bg-[#76abe8] rounded-t-md shadow-lg justify-between">
				<h1 className="flex-[2_0_0%] text-xl font-semibold text-white my-auto break-words overflow-hidden text-ellipsis">
					{component.title}
				</h1>
				<button
					type="button"
					className="m-1 p-1 rounded-lg bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min"
					onClick={() => {
						setPinned(!pinned);
						onComponentPin(component._id);
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
					onClick={() => {
						setBeingEdited(true);
					}}>
					<RiEdit2Fill color="#408de6" />
				</button>
				<button
					type="button"
					onClick={() => onDeleteComponent(component._id)}
					className="m-1 p-1 rounded-lg hover:bg-[#fba0a0] bg-[#c2ddfc] hover:scale-150 hover:shadow-md h-min group">
					<RiDeleteBin2Fill className=" text-[#408de6] group-hover:text-[#ff0000]" />
				</button>
			</div>
			<div className="NoteDiv flex flex-col min-h-[4rem] lg:w-[700px] md:w-[600px] sm:w-[500px] mx-5 mb-5 overflow-y-scroll px-3 py-1 rounded-b-md shadow-xl bg-[#ccd4de]">
				{component.type === "note" ? (
					component.text.split("\n").map((text, lineNum) => (
						<p
							key={lineNum}
							className="float-none break-words overflow-hidden">
							{text}
						</p>
					))
				) : (
					<TodoListComponent
						component={component}
						onListChange={onListChange}
					/>
				)}
				<h3 className="p-1 text-xs text-[#0359c9] font-semibold inline ml-auto mt-auto select-none">
					Last edited: {component.date} {component.time}
				</h3>
			</div>
		</div>
	);
};
export default ComponentInfo;
