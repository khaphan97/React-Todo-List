import React from "react";
import { useSelector } from "react-redux";
import Add from "./components/Add.jsx";
import FormAdd from "./components/FormAdd.jsx";
import ListTask from "./components/ListTask.jsx";
import Search from "./components/Search.jsx";
import Sort from "./components/Sort.jsx";

function Home() {
	const isShowForm = useSelector((state) => state.home.isShowForm);

	return (
		<div className="container">
			<div className="row">
				<Search />
				<Sort />
				<Add />
			</div>
			<div className="row">{isShowForm ? <FormAdd /> : <></>}</div>
			<ListTask />
		</div>
	);
}

export default Home;
