import { useEffect, useState } from "react";
import Header from "../components/header";
import DataDisplay from "../components/data-display";
import { useEnsAddress, useMoralis, useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function Interact() {
    const { isWeb3Enabled, account } = useMoralis();
    const { name } = useEnsAddress(String(account));

    const [addressEntered, setAddressEntered] = useState(false);
    const [address, setAddress] = useState("0x");
    const [userAddress, setUserAddress] = useState();
    const [purchaserAddress, setPurchaserAddress] = useState("0x");
    const [vendorAddress, setVendorAddress] = useState("0x");

    const handleChange = (event) => {
        setAddress(event.target.value);
    };

    async function enterAddress() {
        setAddressEntered(true);
    }

    const { runContractFunction: getPurchaserAddress } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: address,
        functionName: "getPurchaserAddress",
        params: {},
    });

    const { runContractFunction: getVendorAddress } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: address,
        functionName: "getVendorAddress",
        params: {},
    });

    async function updateAddresses() {
        const purchaserAddressFromCall = (await getPurchaserAddress()).toString();
        const vendorAddressFromCall = (await getVendorAddress()).toString();

        setPurchaserAddress(purchaserAddressFromCall.toLowerCase());
        setVendorAddress(vendorAddressFromCall.toLowerCase());
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setUserAddress(account);
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (addressEntered) {
            updateAddresses();
        }
    }, [addressEntered]);

    return (
        <div>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    {addressEntered ? (
                        <div>
                            <DataDisplay address={address} />

                            {() => {
                                if (userAddress === purchaserAddress) {
                                    console.log("p");
                                    return <div>Purchaser</div>;
                                } else if (userAddress === vendorAddress) {
                                    console.log("v");
                                    return <div>Vendor</div>;
                                } else {
                                    console.log("o");
                                    return <h1>NAHHH</h1>;
                                }
                            }}
                        </div>
                    ) : (
                        <div>
                            <label>Enter Address: </label>
                            <input onChange={handleChange} />
                            <br />
                            <button onClick={() => enterAddress()}>Enter</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please Connect your Wallet</div>
            )}
        </div>
    );
}
