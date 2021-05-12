import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { addTaskAsync, closeForm } from "../homeSlice";

function FormAdd() {
	const [isLoading, setIsLoading] = useState(false);

	const taskSelected = useSelector((state) => state.home.taskSelected);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			title: "",
			level: 0,
		},
	});

	React.useEffect(() => {
		if (taskSelected) {
			setValue("title", taskSelected.title);
			setValue("level", taskSelected.level);
		}
	}, [taskSelected, setValue]);

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		setIsLoading(true);
		var newTask = {
			id: null,
			title: data.title,
			level: +data.level,
		};
		if (taskSelected) {
			newTask.id = taskSelected.id;
		}
		const action = addTaskAsync(newTask);
		const response = dispatch(action);
		response.then((res) => {
			setIsLoading(false);
			const { payload } = res;
			if (payload.success) {
				NotificationManager.success(payload.statusText, "Success");
				handleCancel();
			} else {
				NotificationManager.error(payload.statusText, "Error");
			}
		});
	};

	const handleCancel = () => {
		reset();
		const action = closeForm();
		dispatch(action);
	};

	if (isLoading) {
		return (
			<div className="col-md-offset-7 col-md-5">
				<ScaleLoader color={"#5bc0de"} />
			</div>
		);
	}
	return (
		<div className="col-md-offset-7 col-md-5">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label className="sr-only">label</label>
					<input
						type="text"
						className="form-control"
						placeholder="Task Name"
						{...register("title", { required: true })}
						style={errors.title && { border: "1px solid red" }}
					/>
				</div>
				<div className="form-group">
					<label className="sr-only">label</label>
					<select
						name="ds"
						id="inputDs"
						className="form-control"
						required="required"
						{...register("level")}
					>
						Small
						<option value={0}>Normal</option>
						<option value={1}>Medium</option>
						<option value={2}>High</option>
					</select>
				</div>
				<button
					style={{ width: "100%", marginBottom: "10px" }}
					type="submit"
					className="btn btn-primary"
				>
					Submit
				</button>
				<button
					style={{ width: "100%" }}
					type="button"
					className="btn btn-danger"
					onClick={handleCancel}
				>
					Cancel
				</button>
			</form>
		</div>
	);
}

export default FormAdd;
