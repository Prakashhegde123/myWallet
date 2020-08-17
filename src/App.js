import React, { Component } from 'react';
import Wallet from './components/wallet';
import './App.css';

class App extends Component {

	render() {
		return (
			<div className="container">
				<Wallet />
			</div>
		);
	}
}

export default App;
