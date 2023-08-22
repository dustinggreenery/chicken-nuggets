import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function ShippingTimeButton(props) {
    const [giveMoreTime, setGiveMoreTime] = useState();
    const [timeToShip, setTimeToShip] = useState();

    const changeGiveMoreTime = (event) => {
        setGiveMoreTime(event.target.value);
    };

    const changeTimeToShip = (event) => {
        setTimeToShip(event.target.value);
    };

    const { runContractFunction: giveShippingTime } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "giveShippingTime",
        params: {
            giveMoreTime: giveMoreTime,
            timeToShip: timeToShip,
        },
    });

    return (
        <div>
            <div>
                <label>Give More Time? </label>
                <input onChange={changeGiveMoreTime} /> <br />
            </div>
            <div>
                <label>Time to Ship: </label>
                <input onChange={changeTimeToShip} /> <br />
            </div>
            <button onClick={() => giveShippingTime({ onSuccess: props.handleSuccess })}>
                Enter
            </button>
        </div>
    );
}
