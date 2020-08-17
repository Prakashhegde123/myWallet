import React, { Component } from 'react';
import Popup from "reactjs-popup";
import LoadingScreen from 'react-loading-screen';
import { getMyWallet, getBalance, deposit, withdraw } from '../Web3/web3-contract';
import './wallet.css';

class Wallet extends Component {

	constructor(props) {
		super(props)
		this.state = {
            loading: true,
            loadingMessage: 'Initializing....',
            showPopUp: false,
            message: 'Error during transaction',
			owner: '',
			myWallet: '',
			balance: '',
			amount: 0
		}
	}

	componentDidMount() {
		getMyWallet()
			.then( wallet => {
				const { myWallet, owner } = wallet;
				this.setState({ myWallet, owner, loading: true });
				getBalance(this.state.myWallet, this.state.owner)
					.then(balance => this.setState({ balance, loading: false }));
			});
		
	}

	onInputChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handelDeposit = () => {
        this.setState({ loading: true, loadingMessage: 'Transaction processing....' });
		deposit(this.state.myWallet, this.state.owner, this.state.amount)
            .then(balance =>
                balance
                ? this.setState({ balance, loading: false })
                : this.setState({ loading: false, showPopUp: true }));
	}

	handelWithdraw = () => {
        this.setState({ loading: true, loadingMessage: 'Transaction processing....' });
		withdraw(this.state.myWallet, this.state.owner, this.state.amount)
            .then(balance => 
                balance
                ? this.setState({ balance, loading: false })
                : this.setState({ loading: false, showPopUp: true }));
    }
    
    closePopUp = () => this.setState({ showPopUp: false });

	render() {
		return (
            <React.Fragment>
                <Popup
                    open={ this.state.showPopUp }
                    closeOnDocumentClick
                    onClose={ this.closePopUp }
                >
                    <div className="popup-body">
                        { this.state.message }
                        <a className="popup-close" onClick={ this.closePopUp }>X</a>
                    </div>
                </Popup>
                <LoadingScreen
                    loading={ this.state.loading }
                    bgColor='#282c34'
                    spinnerColor='#61DBFB'
                    textColor='#FFFFFF'
                    text={ this.state.loadingMessage }
                > 
                    <div className="card">
                        <div className="card-title">Wallet</div>
                        <div className="card-display-balance">Balance: { this.state.balance }</div>
                        <div className="card-enter-amount">
                            <input className="input-amount" 
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
                </LoadingScreen>
            </React.Fragment>	
		);
	}
}

export default Wallet;
