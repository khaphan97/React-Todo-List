import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAsync, setTaskSelected, openForm } from "../homeSlice";

TaskItem.propTypes = {
	task: PropTypes.object,
	index: PropTypes.number,
};

TaskItem.defaultProps = {
	task: null,
	index: 0,
};

function TaskItem(props) {
	const dispatch = useDispatch();

	const { task, index } = props;

	const LEVEL = [
		{
			id: 0,
			name: "Normal",
			className: "label-primary",
		},
		{
			id: 1,
			name: "Medium",
			className: "label-warning",
		},
		{
			id: 2,
			name: "High",
			className: "label-danger",
		},
	];

	const renderLevel = (level) => {
		const levelInfo = LEVEL.find((levelItem) => levelItem.id === level);
		return (
			<td className="text-center">
				<span className={`label ${levelInfo.className}`}>{levelInfo.name}</span>
			</td>
		);
	};

	const handleDelete = (task) => {
		const confirmation = window.confirm("Are you sure you want to delete this task?");
		if (confirmation) {
			dispatch(deleteTaskAsync(task));
		}
	};

	const handleEditTask = (task) => {
		dispatch(setTaskSelected(task));
		dispatch(openForm());
	};

	return (
		<tr>
			<td className="text-center">{index}</td>
			<td>{task.title}</td>
			{renderLevel(task.level)}
			<td>
				<button type="button" className="btn btn-warning" onClick={() => handleEditTask(task)}>
					Edit
				</button>
				<button type="button" className="btn btn-danger" onClick={() => handleDelete(task)}>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default TaskItem;
