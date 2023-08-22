import { useState } from "react";
import { orderAbi } from "../constants";
import { useWeb3Contract } from "react-moralis";

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
                <label>Value of Goods Received: </label>
                <input onChange={changeShipmentValue} /> wei <br />
            </div>
            <button onClick={() => setShipmentValue()}>Receive Order</button>
        </div>
    );
}
