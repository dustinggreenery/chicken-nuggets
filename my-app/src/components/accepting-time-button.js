import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function AcceptingTimeButton(props) {
    const [giveMoreTime, setGiveMoreTime] = useState();
    const [timeToAccept, setTimeToAccept] = useState();

    const changeGiveMoreTime = (event) => {
        setGiveMoreTime(event.target.value);
    };

    const changeTimeToAccept = (event) => {
        setTimeToAccept(event.target.value);
    };

    const { runContractFunction: giveReceivingTime } = useWeb3Contract({
        abi: orderAbi,
        contractAddress: props.address,
        functionName: "giveReceivingTime",
        params: {
            giveMoreTime: giveMoreTime,
            timeToAccept: timeToAccept,
        },
    });

    return (
        <div>
            <div>
                <label>Give More Time? </label>
                <input onChange={changeGiveMoreTime} /> <br />
            </div>
            <div>
                <label>Time to Accept: </label>
                <input onChange={changeTimeToAccept} /> <br />
            </div>
            <button onClick={() => giveReceivingTime({ onSuccess: props.handleSuccess })}>
                Enter
            </button>
        </div>
    );
}
