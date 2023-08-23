import "./contracts-button.css";
import { factoryAbi, factoryAddresses } from "../constants";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";

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

    const dispatch = useNotification();

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

    const handleCreateContract = async function (tx) {
        await tx.wait(1).then((result) => {
            setAddress(result.events[0].args.PO);
        });
        handleNewNotification(tx);
    };

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "e",
        });
    };

    return (
        <div>
            {isWeb3Enabled ? (
                <div>
                    <div>
                        <label className="Contract-text">Vendor Address: </label>
                        <input className="Contract-text" onChange={changeVendorAddress} /> <br />
                    </div>
                    <div>
                        <label className="Contract-text">Product Order Number: </label>
                        <input className="Contract-text" onChange={changePONo} /> <br />
                    </div>
                    <div>
                        <label className="Contract-text">Time for Vendor to Accept: </label>
                        <input className="Contract-text" onChange={changeTimeToAccept} /> <br />
                    </div>
                    <div>
                        <label className="Contract-text">Time for Vendor to Ship: </label>
                        <input className="Contract-text" onChange={changeTimeToShip} /> <br />
                    </div>
                    <div>
                        <label className="Contract-text">Money Sent: </label>
                        <input className="Contract-text" onChange={changeMoneySent} /> <br />
                    </div>
                    <button
                        className="Contract-text"
                        onClick={() => createProductOrder({ onSuccess: handleCreateContract })}
                    >
                        New Contract!
                    </button>
                    <div className="Contract-text">New Contract Address: {address}</div>
                </div>
            ) : (
                <div>Wallet isn't connected</div>
            )}
        </div>
    );
}
