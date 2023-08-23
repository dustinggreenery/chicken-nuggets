import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./button.css"

export default function Cancel(props) {
    const { runContractFunction: cancelOrder } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "cancelOrder",
        params: {},
    });

    return (
        <div>
            <label className="Button-label">Cancel the order? </label>
            <button className="Button" onClick={() => cancelOrder({ onSuccess: props.handleSuccess })}>Yes</button>
        </div>
    );
}
