import React, { Component } from 'react';
import { getMyWallet, getBalance, deposit, withdraw } from './Web3/web3-contract';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			owner: '',
			myWallet: '',
			balance: '',
			amount: 1
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

	onInputChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handelDeposit = () => {
		deposit(this.state.myWallet, this.state.owner, this.state.amount)
			.then(balance => this.setState({ balance }));
	}

	handelWithdraw = () => {
		withdraw(this.state.myWallet, this.state.owner, this.state.amount)
			.then(balance => this.setState({ balance }));
	}

	render() {
		return (
			<div className="container">
				<div className="card">
					<div className="card-title">Wallet</div>
					<div className="card-display-balance">Balance: { this.state.balance }</div>
					<div className="card-enter-amount">
						<input className="input-amount" min="1" 
							type="number" name="amount" placeholder="enter amount" 
							onChange={this.onInputChange}
						/>
					</div>
					<div className="card-actions">
						<input className="button" type="button" value="Deposit" 
							onClick={this.handelDeposit}
						/>
						<input className="button" type="button" value="Withdraw"  
							onClick={this.handelWithdraw}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
