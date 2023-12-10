# A Trustless Escrow System

Chicken Nuggets is a decentralized application that eliminates the need for trust between a purchaser and a vendor. It provides a cheap option for an escrow and allows companies to save costs like the accounts payable and accounts receivable.

### What Chicken Nuggets does

Chicken Nuggets allows the purchaser to input funds into a smart contract. This shows the vendor that they do have the money at hand. When the vendor accepts the purchase order, the funds are frozen within the smart contract. If all goes, well, the money is sent to the vendor. In a case of a dispute, the funds continue to be frozen until the purchaser and vendor resolve it, in which the money is sent accordingly.

### The Issues within Product Transactions

There lies many trust pitfalls and extra expenses within the process of buying and selling between two companies.

The vendor may wish for the purchaser to prepay, in case the purchaser becomes unable to pay due to bankruptcy or something else. However, the flip side is also true. The purchaser may not necessarily want to prepare in case the vendor is unable to send their goods.

There are escrow systems in place, like a lawyer, but they require a third party and are normally quite expensive.

With Chicken Nuggets, a cheap escrow system is available to avoid all mentioned pitfalls while coming at a small price. It also removes the need for Accounts Payable and Accounts Recievable jobs, freeing up some money.

### How we Built Chicken Nuggets

We used the technology of smart contracts to create this decentralized escrow system. We created a contract factory to deploy product orders for easier use, and used hardhat to deploy and test these smart contracts. To implement the time aspects, we utilized the Plugin Oracle (or Chainlink Oracle on the Ethereum blockchain).

We used Reactjs in order to create the comprehensive front-end. In order to create and interact with the product orders, we used Moralis.

### Why XDC?

XDC's minimal gas fees and quick transaction times were a significant help in out project. We also deeply connected with their emphasis of utility in real-world settings. To increase the adoption of web3 technology, more use cases for the outside world is needed. In this case, developing decentralized applications for the supply chain can expand the DeFi space.

### What's Next?

Different entities are planned to be added to this smart contract to enhance the use of the product order. An option for a court entity at the start will be added. When enough time passes in a dispute, the court entity will gain the power to send tokens to the purchaser and vendor. Another entity that may be added is the shipping entity. Since the company shipping the goods have a great influence on the purchase, their inclusion is necessary.

Another plan in the works is the addition of an ERC20 token that can be native to this project. Another possibility is the use of stablecoins, which may be beneficial since the world is already used to their respective currencies. However, these fiat currencies have pitfalls of their own.

### Relevant Links

**Product Order Factory Address (Sepolia)**: https://sepolia.etherscan.io/address/0x698A53eD075e92fcfF2Af5553125afd1E4f0df60

**Product Order Factory Address (XDC Apothem)**: https://explorer.apothem.network/address/0xABA49a17F3d6AA886e44aed3270CBa21AbBe8C85

**Chainlink's Upkeep Registration**: https://automation.chain.link/

**Plugin's Data Feeds (Coming Soon)**: https://feeds.goplugin.co/comingsoon


**Complete Flowchart of the Product Order Process**
![Flowchart.png](https://cdn.dorahacks.io/static/files/18a2312c9625b2f87a0248b497d8a2c4.png)
