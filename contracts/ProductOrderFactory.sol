// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ProductOrder.sol";

contract ProductOrderFactory {
    event POCreated(address PO, address purchaser, uint256 amountOfMoney, uint256 acceptTimeStamp);

    function createProductOrder(address vendorAddress, uint256 PONo, uint256 timeToAccept, uint256 timeToShip) public payable {
        address purchaser = msg.sender;
        uint256 amountOfMoney = msg.value;
        uint256 acceptTimeStamp = block.timestamp;

        ProductOrder productOrder = new ProductOrder(purchaser, vendorAddress, PONo, amountOfMoney, timeToAccept, acceptTimeStamp, timeToShip);
        address POAddress = address(productOrder);
        
        payable(POAddress).transfer(msg.value);

        // Sets up Upkeep for new contract.
        //     https://docs.chain.link/docs/chainlink-automation/automation-economics/
        //     https://automation.chain.link/?_ga=2.66826409.62596235.1667583413-1479646050.1660059585

        emit POCreated(POAddress, purchaser, amountOfMoney, acceptTimeStamp);
    }
}