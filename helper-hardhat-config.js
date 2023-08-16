const networkConfig = {
    11155111: {
        name: "sepolia",
        factoryAddress: "0xa0B60062c6b46652F496819DF5E1A48063AF46d6",
    },
    31337: {
        name: "hardhat",
        factoryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    51: {
        name: "apothem",
        factoryAddress: "0x8DF6F04BcF385F8d9d7796f7755abfB48A4415BF",
    },
};

const developmentChains = ["hardhat", "localhost", "apothem"];

module.exports = { developmentChains, networkConfig };
