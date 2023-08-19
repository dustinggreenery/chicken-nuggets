import Moralis from "moralis-v1";
import { factoryAbi, factoryAddresses } from "../constants";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ContractTransaction } from "ethers";
const ethers = require("ethers");

export default function ContractButton() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const factoryAddress = chainId in factoryAddresses ? factoryAddresses[chainId][0] : null;

    const [vendorAddress, setVendorAddress] = useState();
    const [PONo, setPONo] = useState();
    const [timeToAccept, setTimeToAccept] = useState();
    const [timeToShip, setTimeToShip] = useState();
    const [moneySent, setMoneySent] = useState();
    const [address, setAddress] = useState("0x");

    const changeVendorAddress = (event) => {
        setVendorAddress(event.target.value);
    };

    const changePONo = (event) => {
        setPONo(event.target.value);
    };

    const changeTimeToAccept = (event) => {
        setTimeToAccept(event.target.value);
    };

    const changeTimeToShip = (event) => {
        setTimeToShip(event.target.value);
    };

    const changeMoneySent = (event) => {
        setMoneySent(event.target.value);
    };

    const { runContractFunction: createProductOrder } = useWeb3Contract({
        abi: factoryAbi,
        contractAddress: factoryAddress,
        functionName: "createProductOrder",
        params: {
            vendorAddress: vendorAddress,
            PONo: PONo,
            timeToAccept: timeToAccept,
            timeToShip: timeToShip,
        },
        msgValue: moneySent * 10 ** 18,
    });

    // function createContract() {
    //     // const provider = new ethers.providers.WebSocketProvider(process.env.SEPOLIA_WEBSOCKET);
    //     const contract = new ethers.Contract(factoryAddress, factoryAbi, Moralis.enableWeb3());

    //     contract.on("POCreated", (from, to, value, event) => {
    //         let transferEvent = {
    //             from: from,
    //             to: to,
    //             value: value,
    //             eventData: event,
    //         };
    //         console.log(JSON.stringify(transferEvent, null, 4));
    //     });

    //     createProductOrder();
    // }

    const handleCreateContract = async (tx) => {
        await tx.wait(1).then((result) => {
            setAddress(result.events[0].args.PO);
        });
    };

    return (
        <div>
            {isWeb3Enabled ? (
                <div>
                    <div>
                        <label>Vendor Address: </label>
                        <input onChange={changeVendorAddress} /> <br />
                    </div>
                    <div>
                        <label>Product Order Number: </label>
                        <input onChange={changePONo} /> <br />
                    </div>
                    <div>
                        <label>Time for Vendor to Accept: </label>
                        <input onChange={changeTimeToAccept} /> <br />
                    </div>
                    <div>
                        <label>Time for Vendor to Ship: </label>
                        <input onChange={changeTimeToShip} /> <br />
                    </div>
                    <div>
                        <label>Money Sent: </label>
                        <input onChange={changeMoneySent} /> <br />
                    </div>
                    <button
                        onClick={() =>
                            createProductOrder({ onSuccess: (tx) => handleCreateContract(tx) })
                        }
                    >
                        New Contract!
                    </button>
                    <div>New Contract Address: {address}</div>
                </div>
            ) : (
                <div>Wallet isn't connected</div>
            )}
        </div>
    );
}
