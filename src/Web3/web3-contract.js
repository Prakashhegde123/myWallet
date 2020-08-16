import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ABI, ADDERSS } from '../Contracts/myWallet'


const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
		infuraId: "INFURA_ID" // required
		}
	}
};

const web3Modal = new Web3Modal({
	cacheProvider: true, // optional
	providerOptions // required
});


export async function getMyWallet() {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

	const myWallet = new web3.eth.Contract(ABI, ADDERSS);
	const wallet = {
		myWallet,
		owner: provider.selectedAddress
	};

    return wallet;
}

export async function getBalance(myWallet, owner) {
    const balance = await myWallet.methods.getBalance(owner).call();
    return balance;
}

export async function deposit(myWallet, owner, amount) {
	await myWallet.methods.deposit(amount, owner).send({from: owner});

	const balance = await myWallet.methods.getBalance(owner).call();
    return balance;
}

export async function withdraw(myWallet, owner, amount) {
	await myWallet.methods.withdraw(amount, owner).send({from: owner});

	const balance = await myWallet.methods.getBalance(owner).call();
    return balance;
}