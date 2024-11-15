// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Reward is ERC20, Ownable {
    address public gameRoomContract;

    constructor() ERC20("ImposterToken", "IMPSTR") {
        _mint(msg.sender, 1000000 * 10**decimals()); // Mint 1M tokens initially
    }

    function setGameRoomContract(address _gameRoomContract) external onlyOwner {
        gameRoomContract = _gameRoomContract;
    }

    function distributeRewards(address[] memory winners, uint256 amount) external {
        require(msg.sender == gameRoomContract, "Only game room can distribute");
        
        uint256 splitAmount = amount / winners.length;
        for (uint i = 0; i < winners.length; i++) {
            _mint(winners[i], splitAmount);
        }
    }
}