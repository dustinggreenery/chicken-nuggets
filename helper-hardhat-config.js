const networkConfig = {
    11155111: {
        name: "sepolia",
        factoryAddress: "0xF6f9a3550F2C8e2F4C7Eea990ff010Eb3C49467a",
    },
    31337: {
        name: "hardhat",
        factoryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = { developmentChains, networkConfig };
