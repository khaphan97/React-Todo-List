import React from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "./App.css";
import Header from "./components/Header";
import Home from "./features/home";

function App() {
	return (
		<div className="App">
			<Header/>
			<NotificationContainer />
			<Home />
		</div>
	);
}

export default App;
