import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function PurchaserDispute(props) {
    const { isWeb3Enabled } = useMoralis();

    const [tokenWorthGot, setTokenWorthGot] = useState();
    const [tokenWorthShipped, setTokenWorthShipped] = useState();
    const [purchaserInput, setPurchaserInput] = useState();

    const changePurchaserInput = (event) => {
        setPurchaserInput(event.target.value * 10 ** 18);
    };

    const { runContractFunction: getTokenWorthGot } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getTokenWorthGot",
        params: {},
    });

    const { runContractFunction: getTokenWorthShipped } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "getTokenWorthShipped",
        params: {},
    });

    const { runContractFunction: setPurchaserDispute } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "setPurchaserDispute",
        params: {
            tokenWorthGot: purchaserInput,
        },
    });

    async function update() {
        const tokenWorthGotFromCall = (await getTokenWorthGot()).toString();
        const tokenWorthShippedFromCall = (await getTokenWorthShipped()).toString();

        setTokenWorthGot(tokenWorthGotFromCall / 10 ** 18);
        setTokenWorthShipped(tokenWorthShippedFromCall / 10 ** 18);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            update();
        }
    }, [isWeb3Enabled]);

    return (
        <div>
            <div>Your input on how much got shipped: {tokenWorthGot} ETH</div>
            <div>Vendor's input on how much got shipped: {tokenWorthShipped} ETH</div>
            <br />
            <div>
                <label>Input the amount you got: </label>
                <input onChange={changePurchaserInput} /> ETH <br />
            </div>
            <button onClick={() => setPurchaserDispute({ onSuccess: props.handleSuccess })}>
                Input
            </button>
        </div>
    );
}
