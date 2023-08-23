import { useEffect, useState } from "react";
import Header from "../components/header";
import DataDisplay from "../components/data-display";
import { useEnsAddress, useMoralis, useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./Interaction.css";
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

    const [addressEntered, setAddressEntered] = useState(false);
    const [address, setAddress] = useState("0x");
    const [userAddress, setUserAddress] = useState();
    const [purchaserAddress, setPurchaserAddress] = useState("0x");
    const [vendorAddress, setVendorAddress] = useState("0x");
    const [state, setState] = useState();
    const [invalidAddress, setInvalidAddress] = useState(false);

    const dispatch = useNotification();

    const handleChange = (event) => {
        setAddress(event.target.value);
    };

    async function enterAddress() {
        await getPurchaserAddress({
            onSuccess: () => {
                setInvalidAddress(false);
                setAddressEntered(true);
            },
            onError: () => setInvalidAddress(true),
        });
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

    const { runContractFunction: getState } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: address,
        functionName: "getState",
        params: {},
    });

    async function update() {
        const purchaserAddressFromCall = (await getPurchaserAddress()).toString();
        const vendorAddressFromCall = (await getVendorAddress()).toString();
        const stateFromCall = (await getState()).toString();

        setPurchaserAddress(purchaserAddressFromCall.toLowerCase());
        setVendorAddress(vendorAddressFromCall.toLowerCase());
        setState(stateFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setUserAddress(account);
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (addressEntered) {
            update();
        }
    }, [addressEntered]);

    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification(tx);
        update();
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
                            <br />
                            {userAddress === purchaserAddress ? (
                                <div>
                                    You are the purchaser in this order
                                    {state === "0" ? (
                                        <div>
                                            <br />{" "}
                                            <Cancel
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "1" ? (
                                        <div>
                                            <br />
                                            <AcceptingTimeButton
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "2" ? (
                                        <div>
                                            <br /> The purchaser order is cancelled.
                                        </div>
                                    ) : state === "3" ? (
                                        <div>
                                            <br /> Waiting on vendor to ship goods...
                                        </div>
                                    ) : state === "4" ? (
                                        <div>
                                            <br />
                                            <ShippingTimeButton
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "5" ? (
                                        <div>
                                            <br />
                                            <ShipmentValueButton
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "6" ? (
                                        <div>
                                            <br /> The purchase order has ended.
                                        </div>
                                    ) : state === "7" ? (
                                        <div>
                                            <br />
                                            <PurchaserDispute
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />{" "}
                                        </div>
                                    ) : state === "8" ? (
                                        <div>
                                            <br /> The dispute has ended.
                                        </div>
                                    ) : (
                                        <div>Well this is an odd place...</div>
                                    )}
                                </div>
                            ) : userAddress === vendorAddress ? (
                                <div>
                                    You are the vendor in this order
                                    {state === "0" ? (
                                        <div>
                                            <br />{" "}
                                            <RecieveOrderButton
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "1" ? (
                                        <div>
                                            <br /> The time to accept the order has ran out. Reach
                                            out to the purchaser for an extension.
                                        </div>
                                    ) : state === "2" ? (
                                        <div>
                                            <br /> The purchase order has been cancelled.
                                        </div>
                                    ) : state === "3" ? (
                                        <div>
                                            <br />
                                            <Shipped
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "4" ? (
                                        <div>
                                            <br /> The time to ship has ran out. The purchaser can
                                            extend the shipping time.
                                        </div>
                                    ) : state === "5" ? (
                                        <div>
                                            <br /> Waiting on purchaser to say they have received
                                            the goods...
                                        </div>
                                    ) : state === "6" ? (
                                        <div>
                                            <br /> The purchase order has ended.
                                        </div>
                                    ) : state === "7" ? (
                                        <div>
                                            <br />
                                            <VendorDispute
                                                address={address}
                                                handleSuccess={handleSuccess}
                                            />
                                        </div>
                                    ) : state === "8" ? (
                                        <div>
                                            <br /> The dispute has ended.
                                        </div>
                                    ) : (
                                        <div>Well this is an odd place...</div>
                                    )}
                                </div>
                            ) : (
                                <h1>NAHHH</h1>
                            )}
                            <br />
                        </div>
                    ) : (
                        <div>

                            {/* <header className="Interaction-heading-color">
                                 <p className="Interaction-heading">Find your order</p>
                            </header> */}
                            <header className="find-form">
                                <label className="Interaction-subheading">Enter your order address </label>
                                <input className="Interaction-input" onChange={handleChange} placeholder="Search..." />
                                <button className="button" onClick={() => enterAddress()}>Search</button>
                            </header>
                            {invalidAddress ? (
                                <div>
                                    <label className="Interaction-invalid">
                                        Invalid Contract Address
                                    </label>
                                </div>
                            ) : (
                                <div></div>
                            )}

                        </div>
                    )}
                </div>
            ) : (
                <div>Please Connect your Wallet</div>
            )}
        </div>
    );
}
