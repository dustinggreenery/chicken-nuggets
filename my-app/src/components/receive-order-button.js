import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./button.css"

export default function RecieveOrderButton(props) {
    const [orderAccepted, setOrderAccepted] = useState(false);
    const [amountAccepted, setAmountAccepted] = useState(1);

    const changeOrderAccepted = () => {
        setOrderAccepted(!orderAccepted);
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
                <label className="Button-label">Accept Order? </label>
                <label className="container"> Yes
                    <input className="checkbox" type="checkbox" checked={orderAccepted} onChange={changeOrderAccepted} /> <span className="checkmark"></span>
                </label> 
                <label className="container"> No
                    <input className="checkbox" type="checkbox"  checked={!orderAccepted}onChange={changeOrderAccepted} /> <span className="checkmark"></span>
                </label> 
            </div>
                {orderAccepted ? <div>
                    <label className="Button-label">Amount of Order Accepted: </label>
                    <input className="input" onChange={changeAmountAccepted} placeholder="in wei..." /> <br />
                </div> : false}
                <button className="Button" onClick={() => recievePurchaseOrder({ onSuccess: props.handleSuccess })}>
                    Receive Order
                </button>
        </div>
    );
}
