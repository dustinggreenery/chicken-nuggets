const { developmentChains, networkConfig } = require("../helper-hardhat-config");
const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { log } = deployments;
    const chainId = network.config.chainId;

    // Arguments used in creating a product order
    const factoryAddress = networkConfig[chainId]["factoryAddress"];
    const { vendor } = await getNamedAccounts();
    const PONo = 0;
    const timeToAccept = 1000000000000000;
    const timeToShip = 1000000000000000;
    const moneySent = "0.001";

    // Getting the factory contract
    const factory = await ethers.getContractAt("ProductOrderFactory", factoryAddress);

    // Creating a product order
    const tx = await factory.createProductOrder(vendor, PONo, timeToAccept, timeToShip, {
        value: ethers.utils.parseEther(moneySent),
    });
    const receipt = await tx.wait(3);

    // Recieving the address of the new product order smart contract from the POCreated event that was emitted
    const POAddress = receipt.events[0].args.PO;

    // Printing out the address
    log(`Product Order Address: ${POAddress}`);

    // Verifying the new smart contract on etherscan
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        const args = [
            receipt.events[0].args.purchaser, // Purchaser Address
            vendor, // Vendor Address
            PONo, // Purchase Order Number
            receipt.events[0].args.amountOfMoney, // Amount of Money
            timeToAccept, // Amount of Seconds for Vendor to Accept Purchase Order
            receipt.events[0].args.acceptTimeStamp, // Time Stamp for Acceptance
            timeToShip, // Amount of Seconds for Vendor to Ship Goods
        ];

        await verify(POAddress, args);
    }

    log(
        "----------------------------------------------------------------------------------------------"
    );
};

module.exports.tags = ["all", "deploy"];
