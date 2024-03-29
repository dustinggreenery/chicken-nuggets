const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { purchaser } = await getNamedAccounts();

    // Deploying the product order factory
    const factory = await deploy("ProductOrderFactory", {
        from: purchaser,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    console.log(`Factory Address: ${factory.address}`);

    // Verifying the product order factory on etherscan
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(factory.address, []);
    }
    log(
        "----------------------------------------------------------------------------------------------"
    );
};

module.exports.tags = ["all", "factory"];
