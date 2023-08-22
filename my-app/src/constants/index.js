const factoryAbi = require("./factoryAbi.json");
const orderAbi = require("./orderAbi.json");
const factoryAddresses = require("./factoryAddresses.json");

const states = {
    0: "Sent",
    1: "Acceptance Ran Out of Time",
    2: "Cancelled",
    3: "Accepted",
    4: "Shipping Ran Out of Time",
    5: "Goods were Sent",
    6: "Product Order Finished",
    7: "Dispute",
    8: "Dispute Ended",
};

module.exports = {
    factoryAbi,
    orderAbi,
    factoryAddresses,
    states,
};
