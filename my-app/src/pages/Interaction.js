import { useEffect, useState } from "react";
import Header from "../components/header";
import DataDisplay from "../components/data-display";
import { useEnsAddress, useMoralis, useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./Interaction.css"
import RecieveOrderButton from "../components/receive-order-button";
import Shipped from "../components/shipped-button";
import { useNotification } from "web3uikit";
import ShipmentValueButton from "../components/shipment-value-button";
import Cancel from "../components/cancel-button";
import AcceptingTimeButton from "../components/accepting-time-button";
import ShippingTimeButton from "../components/shipping-time-button";
import PurchaserDispute from "../components/purchaser-disbute";
import VendorDispute from "../components/vendor-dispute";

export default function Interact() {
    const { isWeb3Enabled, account } = useMoralis();
    const { name } = useEnsAddress(String(account));

    const [addressEntered, setAddressEntered] = useState(false);
    const [address, setAddress] = useState("0x");
    const [userAddress, setUserAddress] = useState();
    const [purchaserAddress, setPurchaserAddress] = useState("0x");
    const [vendorAddress, setVendorAddress] = useState("0x");

    const dispatch = useNotification();

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

    const handleSuccess = async function (tx) {
        await tx.wait(1);
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
            <Header />
            {isWeb3Enabled ? (
                <div className="Interaction">
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
                            <br />
                        </div>
                    ) : (
                        <div>
                            <header className="Interaction-heading-color">
                                 <p className="Interaction-heading">Find your order</p>
                            </header>
                            <label className="Interaction-subheading">Enter your order address: </label>
                            <input className="Interaction-input" onChange={handleChange} placeholder="Search..." />
                            <button className="button" onClick={() => enterAddress()}>Search</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please Connect your Wallet</div>
            )}
        </div>
    );
}

{
    /* 
    cancelOrder: <Cancel address={address} handleSuccess={handleSuccess} />
    giveReceivingTime: <AcceptingTimeButton address={address} handleSuccess={handleSuccess} />
    recievePurchaseOrder: <RecieveOrderButton address={address} handleSuccess={handleSuccess} /> 
    giveShippingTime: <ShippingTimeButton address={address} handleSuccess={handleSuccess} />
    setProductSent: <Shipped address={address} handleSuccess={handleSuccess} />
    setShipmentValue: <ShipmentValueButton address={address} handleSuccess={handleSuccess} /> does have wei/ether issue tho
    setPurchaserDispute: <PurchaserDispute address={address} handleSuccess={handleSuccess} />
    setVendorDispute: <VendorDispute address={address} handleSuccess={handleSuccess} />
*/
}
