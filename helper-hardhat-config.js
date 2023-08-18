const networkConfig = {
    11155111: {
        name: "sepolia",
        factoryAddress: "0x698A53eD075e92fcfF2Af5553125afd1E4f0df60",
    },
    31337: {
        name: "hardhat",
        factoryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    51: {
        name: "apothem",
        factoryAddress: "0xABA49a17F3d6AA886e44aed3270CBa21AbBe8C85",
    },
};

const developmentChains = ["hardhat", "localhost", "apothem"];

module.exports = { developmentChains, networkConfig };
