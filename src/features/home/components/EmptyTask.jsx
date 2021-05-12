import React from "react";

function EmptyTask(props) {
	const { strSearch } = props;

	if (!strSearch) {
		return (
			<tr>
				<td className="text-center" colSpan="4">
					Add your task to begin
				</td>
			</tr>
		);
	}
	return (
		<tr>
			<td className="text-center" colSpan="4">
				Doesn't find any task match your search
			</td>
		</tr>
	);
}

export default EmptyTask;
