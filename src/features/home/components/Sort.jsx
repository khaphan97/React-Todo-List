import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../homeSlice";

function Sort(props) {
	const orderBy = useSelector((state) => state.home.orderBy);
	const orderDir = useSelector((state) => state.home.orderDir);

	const dispatch = useDispatch();

	const handleOrderClick = (event, orderBy, orderDir) => {
		event.preventDefault();
		const action = orderAction({ orderBy, orderDir });
		dispatch(action);
	};

	return (
		<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			<div className="dropdown">
				<button
					className="btn btn-default dropdown-toggle"
					type="button"
					id="dropdownMenu1"
					data-toggle="dropdown"
				>
					Sort by <span className="caret" />
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
					<li>
						<a
							href="/#"
							role="button"
							onClick={(event) => handleOrderClick(event, "title", "asc")}
						>
							Title ASC
						</a>
					</li>
					<li>
						<a
							href="/#"
							role="button"
							onClick={(event) => handleOrderClick(event, "title", "desc")}
						>
							Title DESC
						</a>
					</li>
					<li role="separator" className="divider" />
					<li>
						<a
							href="/#"
							role="button"
							onClick={(event) => handleOrderClick(event, "level", "asc")}
						>
							Level ASC
						</a>
					</li>
					<li>
						<a
							href="/#"
							role="button"
							onClick={(event) => handleOrderClick(event, "level", "desc")}
						>
							Level DESC
						</a>
					</li>
				</ul>
				<span
					style={{ textTransform: "uppercase" }}
					className="label label-success label-medium"
				>{`${orderBy} - ${orderDir}`}</span>
			</div>
		</div>
	);
}

export default Sort;
