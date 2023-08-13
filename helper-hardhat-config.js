const networkConfig = {
    11155111: {
        name: "sepolia",
        factoryAddress: "0xa0B60062c6b46652F496819DF5E1A48063AF46d6",
    },
    31337: {
        name: "hardhat",
        factoryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = { developmentChains, networkConfig };
