// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ProductOrder.sol";

contract ProductOrderFactory {
    // Event that is emit when a purchase order is created
    event POCreated(address PO, address purchaser, uint256 amountOfMoney, uint256 acceptTimeStamp);

    // Function for a purchase to create a product order
    function createProductOrder(address vendorAddress, uint256 PONo, uint256 timeToAccept, uint256 timeToShip) public payable {
        address purchaser = msg.sender;
        uint256 amountOfMoney = msg.value;
        uint256 acceptTimeStamp = block.timestamp;

        ProductOrder productOrder = new ProductOrder(purchaser, vendorAddress, PONo, amountOfMoney, timeToAccept, acceptTimeStamp, timeToShip);
        address POAddress = address(productOrder);
        
        payable(POAddress).transfer(msg.value);

        emit POCreated(POAddress, purchaser, amountOfMoney, acceptTimeStamp);
    }
}