import React, { Component } from 'react';
import { getMyWallet, getBalance } from './Web3/web3-contract';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			owner: '',
			myWallet: '',
			balance: ''
		}
	}

	componentDidMount() {
		getMyWallet()
			.then( wallet => {
				const { myWallet, owner } = wallet;
				this.setState({ myWallet, owner });
				getBalance(this.state.myWallet, this.state.owner)
					.then(balance => this.setState({ balance }));
			});
		
	}

	render() {
		return (
			<div className="container">
				<div className="card">
					<div className="card-title">Wallet</div>
					<div className="card-display-balance">Balance: { this.state.balance }</div>
					<div className="card-enter-amount">
						<input className="input-amount" type="number" name="amount" placeholder="enter amount" />
					</div>
					<div className="card-actions">
						<input className="button" type="button" value="Deposit" />
						<input className="button" type="button" value="Withdraw" />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
