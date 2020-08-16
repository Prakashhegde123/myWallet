pragma solidity ^0.5.7;

contract myWallet {
    address private owner;
    
    mapping(address => uint) public wallet;
    
    constructor() public {
        uint balance = 0;
        owner = msg.sender;
        wallet[owner] = balance;
    }
    
    function getBalance() public view returns (uint) {
        return wallet[owner];
    }
    
    function getOwner() public view returns (address) {
        return owner;
    }
    
    function deposit(uint amount) public {
        assert(amount > 0);
        wallet[owner] += amount;
    }
    
    function withdraw(uint amount) public {
        assert(amount <= wallet[owner]);
        wallet[owner] -= amount;
    }
}