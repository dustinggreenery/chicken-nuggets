import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function Cancel(props) {
    const { runContractFunction: cancelOrder } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "cancelOrder",
        params: {},
    });

    return (
        <div>
            <label>Cancel the order? </label>
            <button onClick={() => cancelOrder({ onSuccess: props.handleSuccess })}>Yes</button>
        </div>
    );
}
