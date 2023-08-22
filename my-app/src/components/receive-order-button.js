import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function RecieveOrderButton(props) {
    const [orderAccepted, setOrderAccepted] = useState();
    const [amountAccepted, setAmountAccepted] = useState();

    const changeOrderAccepted = (event) => {
        setOrderAccepted(event.target.value);
    };

    const changeAmountAccepted = (event) => {
        setAmountAccepted(event.target.value);
    };

    const { runContractFunction: recievePurchaseOrder } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "recievePurchaseOrder",
        params: {
            orderAccepted: orderAccepted,
            amountOfPOAccepted: amountAccepted,
        },
    });

    return (
        <div>
            <div>
                <label>Accept Order? </label>
                <input onChange={changeOrderAccepted} /> <br />
            </div>
            <div>
                <label>Amount of Order Accepted: </label>
                <input onChange={changeAmountAccepted} /> wei <br />
            </div>
            <button onClick={() => recievePurchaseOrder({ onSuccess: props.handleSuccess })}>
                Receive Order
            </button>
        </div>
    );
}
