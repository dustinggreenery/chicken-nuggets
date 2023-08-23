import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./button.css"

export default function Shipped(props) {
    const { runContractFunction: setProductSent } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "setProductSent",
        params: {
            sent: true,
        },
    });

    return (
        <div>
            <label className="Button-label">Have the products been shipped? </label>
            <button className="Button" onClick={() => setProductSent({ onSuccess: props.handleSuccess })}>Yes</button>
        </div>
    );
}
