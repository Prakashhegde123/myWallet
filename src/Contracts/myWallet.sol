pragma solidity ^0.5.7;

contract myWallet {
    
    mapping(address => uint) private wallet;
    
    
    function getBalance(address owner) public view returns (uint) {
        return wallet[owner];
    }
    
    function deposit(uint amount, address owner) public {
        assert(amount > 0);
        wallet[owner] += amount;
    }
    
    function withdraw(uint amount, address owner) public {
        assert(amount <= wallet[owner]);
        wallet[owner] -= amount;
    }
}