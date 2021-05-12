import React from "react";
import { useDispatch } from "react-redux";
import { toggleForm } from "../homeSlice";
function Add(props) {
	const dispatch = useDispatch();
	const handleToggleForm = () => {
		const action = toggleForm();
		dispatch(action);
	};

	return (
		<div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
			<button type="button" className="btn btn-info btn-block" onClick={handleToggleForm}>
				Add Task
			</button>
		</div>
	);
}
export default Add;
