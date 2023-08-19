import { factoryAbi, factoryAddresses } from "../constants";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
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

    function createContract() {
        createProductOrder();
    }

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
                    <button onClick={() => createContract()}>New Contract!</button>
                </div>
            ) : (
                <div>Wallet isn't connected</div>
            )}
        </div>
    );
}
