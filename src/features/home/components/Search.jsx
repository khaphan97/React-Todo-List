import debounce from "lodash.debounce";
import React from "react";
import { useDispatch } from "react-redux";
import { searchAction } from "../homeSlice";

function Search() {
	const [strSearch, setStrSearch] = React.useState("");

	const dispatch = useDispatch();

	const handleChange = (e) => {
		setStrSearch(e.target.value);
	};

	const handleSearch = () => {
		const action = searchAction(strSearch);
		dispatch(action);
	};

	const debounceSearch = debounce(handleSearch, 300);

	React.useEffect(() => {
		debounceSearch();

		return debounceSearch.cancel;
	}, [strSearch, debounceSearch]);

	return (
		<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Search for..."
					onChange={(event) => handleChange(event)}
					value={strSearch}
				/>
				<span className="input-group-btn">
					<button className="btn btn-info" type="button">
						Go!
					</button>
				</span>
			</div>
		</div>
	);
}

export default Search;
