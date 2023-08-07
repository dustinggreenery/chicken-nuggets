const networkConfig = {
    11155111: {
        name: "sepolia",
        factoryAddress: "0xE2b1D1305036d1739e96e0729a60DEe6a4112Ee8",
    },
    31337: {
        name: "hardhat",
        factoryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = { developmentChains, networkConfig };
