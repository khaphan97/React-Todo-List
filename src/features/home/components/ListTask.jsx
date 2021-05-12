import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { getListTaskAsync } from "../homeSlice";
import EmptyTask from "./EmptyTask";
import TaskItem from "./TaskItem";
import { orderBy as orderByFunction } from "lodash";
function ListTask(props) {
	const orderBy = useSelector((state) => state.home.orderBy);

	const orderDir = useSelector((state) => state.home.orderDir);

	const isLoading = useSelector((state) => state.home.isLoading);

	const listTask = useSelector((state) => state.home.listTask);

	const strSearch = useSelector((state) => state.home.strSearch);

	const listTaskOriginal = listTask ? [...listTask] : [];

	const listTaskSearch = listTaskOriginal.filter((task) =>
		task.title.toLowerCase().includes(strSearch),
	);

	const listTaskSort = orderByFunction(listTaskSearch, [orderBy], [orderDir]);


	const dispatch = useDispatch();

	React.useEffect(() => {
		const getListTask = async () => {
			dispatch(getListTaskAsync());
		};
		getListTask();
	}, [dispatch]);

	const renderTaskItem = () => {
		if (isLoading) {
			return (
				<tr>
					<td colSpan="4">
						<BeatLoader color={"#5bc0de"} />
					</td>
				</tr>
			);
		}
		if (listTaskSort.length > 0) {
			return listTaskSort.map((task, index) => {
				return <TaskItem key={task.id} index={++index} task={task} />;
			});
		}
		return <EmptyTask strSearch={strSearch} />;
	};

	return (
		<div className="panel panel-success">
			<div className="panel-heading">List Task</div>
			<table className="table table-hover ">
				<thead>
					<tr>
						<th style={{ width: "10%" }} className="text-center">
							#
						</th>
						<th>Task</th>
						<th style={{ width: "20%" }} className="text-center">
							Level
						</th>
						<th style={{ width: "20%" }}>Action</th>
					</tr>
				</thead>
				<tbody>{renderTaskItem()}</tbody>
			</table>
		</div>
	);
}

export default ListTask;
