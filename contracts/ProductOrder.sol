// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error ProductOrder__NotPurchaser();
error ProductOrder__NotVendor();

contract ProductOrder is KeeperCompatibleInterface {
    // State of Order
    enum POState {
	    SENT,
	    CANCELLED,  
	    ACCEPTED,
	    DISPUTE,
        END,
        DISPUTE_END
    }
    POState private s_state;
    
    // All addresses
    address private immutable i_purchaserAddress;
    address private immutable i_vendorAddress;

    // Amount of Money currently in contract
    uint256 private s_amountOfMoney;

    // Identifier to know what purchase order it is.
    uint256 private immutable i_PONo;

    // Timing to accept and shipping
    uint256 private immutable i_timeToAccept;
    uint256 private immutable i_acceptTimeStamp;
    uint256 private immutable i_timeToShip;
    uint256 private s_shippingTimeStamp;

    // Dispute Variables
    int256 private s_tokenWorthGot = -1;
    int256 private s_tokenWorthShipped = -2;

    // Modifiers
    modifier onlyPurchaser() {
        if (msg.sender != i_purchaserAddress) revert ProductOrder__NotPurchaser();
        _;
    }
    modifier onlyVendor() {
        if (msg.sender != i_vendorAddress) revert ProductOrder__NotVendor();
        _;
    }

    // Constructor to Create Smart Contract
    constructor(address purchaserAddress, address vendorAddress, uint256 PONo, uint256 amountOfMoney, uint256 timeToAccept, uint256 acceptTimeStamp, uint256 timeToShip) {
        i_purchaserAddress = purchaserAddress;
        i_vendorAddress = vendorAddress;
        i_PONo = PONo;
        s_amountOfMoney = amountOfMoney;
        i_timeToAccept = timeToAccept;
        i_acceptTimeStamp = acceptTimeStamp;
        i_timeToShip = timeToShip;
        
        s_state = POState.SENT;
    }

    // Receieve and Fallback Functions
    receive() external payable {}

    fallback() external payable {}

    // A function for the purchaser to cancel a sent order
    function cancelOrder() public onlyPurchaser {
        require(s_state == POState.SENT);

        payable(i_purchaserAddress).transfer(s_amountOfMoney);
        s_amountOfMoney = 0;

        s_state = POState.CANCELLED;
    }

    // A function to let the vendor accept and receieve a purchase order
    function recievePurchaseOrder(bool orderAccepted, uint256 amountOfPOAccepted) public onlyVendor {
        require(s_state == POState.SENT);
        require(amountOfPOAccepted <= s_amountOfMoney);

        if (!orderAccepted) {
            s_state = POState.CANCELLED;
            payable(i_purchaserAddress).transfer(s_amountOfMoney);
            s_amountOfMoney = 0;
        }
        else {
            s_state = POState.ACCEPTED;
            s_shippingTimeStamp = block.timestamp;
            payable(i_purchaserAddress).transfer(s_amountOfMoney - amountOfPOAccepted);
            s_amountOfMoney = amountOfPOAccepted;
        }
    }

    // When the purchaser receieves the goods, they set the shipment value
    function setShipmentValue(uint256 shipmentValue) public onlyPurchaser {
        require(s_state == POState.ACCEPTED);
        require(shipmentValue <= s_amountOfMoney);
        require(shipmentValue >= 0);

        if (shipmentValue == s_amountOfMoney) {
            s_state = POState.END;
            payable(i_vendorAddress).transfer(s_amountOfMoney);
            s_amountOfMoney = 0;
        }
        else {
            s_state = POState.DISPUTE;
            s_tokenWorthGot = int256(shipmentValue);
        }
    }

    // In a case of a dispute, this function lets the purchaser set their variable
    function setPurchaserDispute(int256 tokenWorthGot) public onlyPurchaser {
        require(s_state == POState.DISPUTE);
        require(tokenWorthGot <= int256(s_amountOfMoney));
        require(tokenWorthGot >= 0);
        s_tokenWorthGot = tokenWorthGot;
    }

    // In a case of a dispute, this function lets the vendor set their variable
    function setVendorDispute(int256 tokenWorthShipped) public onlyVendor {
        require(s_state == POState.DISPUTE);
        require(tokenWorthShipped <= int256(s_amountOfMoney));
        require(tokenWorthShipped >= 0);
        s_tokenWorthShipped = tokenWorthShipped;
    }

    // This function is the upkeep which checks the time the purchase order is sent, the time it takes to ship, and the dispute variables in their respective states
    function checkUpkeep(bytes memory) public view override returns (bool upkeepNeeded, bytes memory) {
        if (s_state == POState.SENT) {
            upkeepNeeded = (block.timestamp - i_acceptTimeStamp) > i_timeToAccept;
        } else if (s_state == POState.ACCEPTED) {
            upkeepNeeded = ((block.timestamp - s_shippingTimeStamp) > i_timeToShip) && s_tokenWorthGot == -1;
        } else if (s_state == POState.DISPUTE) {
            upkeepNeeded = s_tokenWorthGot == s_tokenWorthShipped;
        }
    }

    // This function performs upkeeps when conditions are met. When a sent or accepted purchase order runs out of time to accept or ship, this function refunds the purchaser.
    // In a dispute, this function gives the deserved money to the purchaser and vendor.
    function performUpkeep(bytes calldata) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        require(upkeepNeeded);

        if (s_state == POState.SENT || s_state == POState.ACCEPTED) {
            s_state = POState.CANCELLED;
            payable(i_purchaserAddress).transfer(s_amountOfMoney);
            s_amountOfMoney = 0;
        } else if (s_state == POState.DISPUTE) {
            s_state = POState.DISPUTE_END;
            payable(i_purchaserAddress).transfer(s_amountOfMoney - uint256(s_tokenWorthShipped));
            payable(i_vendorAddress).transfer(uint256(s_tokenWorthShipped));
            s_amountOfMoney = 0;
        }
    }

    // Getter functions for all the variables
    function getState() public view returns(POState) {
        return s_state;
    }

    function getPurchaserAddress() public view returns(address) {
        return i_purchaserAddress;
    }

    function getVendorAddress() public view returns(address) {
        return i_vendorAddress;
    }

    function getAmountOfMoney() public view returns(uint256) {
        return s_amountOfMoney;
    }

    function getPONo() public view returns(uint256) {
        return i_PONo;
    }

    function getTimeToAccept() public view returns(uint256) {
        return i_timeToAccept;
    }

    function getAcceptTimeStamp() public view returns(uint256) {
        return i_acceptTimeStamp;
    }

    function getTimeToShip() public view returns(uint256) {
        return i_timeToShip;
    }

    function getShippingTimeStamp() public view returns(uint256) {
        return s_shippingTimeStamp;
    }

    function getTokenWorthGot() public view returns(int256) {
        return s_tokenWorthGot;
    }

    function getTokenWorthShipped() public view returns(int256) {
        return s_tokenWorthShipped;
    }
}