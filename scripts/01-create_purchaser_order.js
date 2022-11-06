const { developmentChains } = require("../helper-hardhat-config");
const { network, ethers, getNamedAccounts } = require("hardhat");
const { verify } = require("../utils/verify");

async function createPO() {
    const { purchaser, vendor } = await getNamedAccounts();
    const factoryAddress = "0xAc04165956adc99e72211eb36A9eD5e05D907933";

    const factory = await ethers.getContractAt("ProductOrderFactory", factoryAddress);

    const tx = await factory.createProductOrder(vendor, 0, 1000000000000000, 1000000000000000, {
        value: ethers.utils.parseEther("0.001"),
    });
    const receipt = await tx.wait(5);

    const POAddress = receipt.events[0].args.PO;
    const args = [
        receipt.events[0].args.purchaser,
        vendor,
        0,
        receipt.events[0].args.amountOfMoney,
        1000000000000000,
        receipt.events[0].args.acceptTimeStamp,
        1000000000000000,
    ];

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(POAddress, args);
    }

    console.log(POAddress);
}

createPO()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
