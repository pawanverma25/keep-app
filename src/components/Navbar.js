import "../index.css";

const Navbar = () => {
	return (
		<div className="sticky flex justify-end text-xl px-10 py-5 select-none">
			<div className="flex-1 text-2xl font-semibold">todo list</div>
			<div className="flex justify-evenly flex-1">
				<div>notes</div>
				<div>to-do list</div>
				<div>login</div>
				<div>signup</div>
			</div>
		</div>
	);
};

export default Navbar;
