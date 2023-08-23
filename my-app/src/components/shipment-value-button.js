import { useState } from "react";
import { orderAbi } from "../constants";
import { useWeb3Contract } from "react-moralis";
import "./button.css"

export default function ShipmentValueButton(props) {
    const [shipmentValue, ssetShipmentValue] = useState();

    const changeShipmentValue = (event) => {
        ssetShipmentValue(event.target.value);
    };

    const { runContractFunction: setShipmentValue } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "setShipmentValue",
        params: {
            shipmentValue: shipmentValue,
        },
    });

    return (
        <div>
            <div>
                <label className="Button-label" >Value of Goods Received: </label>
                <input className="input" onChange={changeShipmentValue} placeholder="in wei..." /> wei <br />
            </div>
            <button className="Button" onClick={() => setShipmentValue()}>Receive Order</button>
        </div>
    );
}
