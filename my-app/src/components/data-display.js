import "./data-display.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { orderAbi, states, units } from "../constants";

export default function DataDisplay(props) {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const unit = units[chainId];

    const [state, setState] = useState();
    const [purchaserAddress, setPurchaserAddress] = useState();
    const [vendorAddress, setVendorAddress] = useState();
    const [moneyInContract, setMoneyInContract] = useState();
    const [PONo, setPONo] = useState();
    const [timeToAccept, setTimeToAccept] = useState();
    const [timeToShip, setTimeToShip] = useState();

    const { runContractFunction: getState } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getState",
        params: {},
    });

    const { runContractFunction: getPurchaserAddress } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getPurchaserAddress",
        params: {},
    });

    const { runContractFunction: getVendorAddress } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getVendorAddress",
        params: {},
    });

    const { runContractFunction: getAmountOfMoney } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getAmountOfMoney",
        params: {},
    });

    const { runContractFunction: getPONo } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getPONo",
        params: {},
    });

    const { runContractFunction: getTimeToAccept } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getTimeToAccept",
        params: {},
    });

    const { runContractFunction: getTimeToShip } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getTimeToShip",
        params: {},
    });

    async function update() {
        const stateFromCall = (await getState()).toString();
        const purchaserAddressFromCall = (await getPurchaserAddress()).toString();
        const vendorAddressFromCall = (await getVendorAddress()).toString();
        const amountOfMoneyFromCall = (await getAmountOfMoney()).toString();
        const PONoFromCall = (await getPONo()).toString();
        const timeToAcceptFromCall = (await getTimeToAccept()).toString();
        const timeToShipFromCall = (await getTimeToShip()).toString();

        setState(stateFromCall);
        setPurchaserAddress(purchaserAddressFromCall);
        setVendorAddress(vendorAddressFromCall);
        setMoneyInContract(amountOfMoneyFromCall);
        setPONo(PONoFromCall);
        setTimeToAccept(timeToAcceptFromCall);
        setTimeToShip(timeToShipFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            update();
        }
    }, [isWeb3Enabled]);

    return (
        <div className="Display-form">
            <label className="Display-bold">State:</label>
            <label className="Display-text"> {states[state]}</label> <br />
            <label className="Display-bold">Purchaser Address:</label>
            <label className="Display-text"> {purchaserAddress}</label> <br />
            <label className="Display-bold">Vendor Address:</label>
            <label className="Display-text"> {vendorAddress}</label> <br />
            <label className="Display-bold">Money in Order:</label>
            <label className="Display-text">
                {moneyInContract / 10 ** 18} {unit}
            </label>{" "}
            <br />
            <label className="Display-bold">Product Order No:</label>
            <label className="Display-text"> {PONo}</label> <br />
            <label className="Display-bold">Time for Vendor to Accept:</label>
            <label className="Display-text"> {timeToAccept}</label> <br />
            <label className="Display-bold">Time for Vendor to Ship:</label>
            <label className="Display-text"> {timeToShip}</label> <br />
        </div>
    );
}
