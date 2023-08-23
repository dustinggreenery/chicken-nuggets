import "./button.css";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";

export default function AcceptingTimeButton(props) {
    const [giveMoreTime, setGiveMoreTime] = useState();
    const [timeToAccept, setTimeToAccept] = useState();

    const changeGiveMoreTime = (event) => {
        setGiveMoreTime(!giveMoreTime);
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
                <label className="Button-label">Give More Time? </label>
                <label className="container">
                    {" "}
                    Yes
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={giveMoreTime}
                        onChange={changeGiveMoreTime}
                    />{" "}
                    <span className="checkmark"></span>
                </label>
                <label className="container">
                    {" "}
                    No
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={!giveMoreTime}
                        onChange={changeGiveMoreTime}
                    />{" "}
                    <span className="checkmark"></span>
                </label>
            </div>
            {giveMoreTime ? (
                <div>
                    <label className="Button-label">Time to Accept: </label>
                    <input className="input" onChange={changeTimeToAccept} />
                </div>
            ) : (
                false
            )}
            <br />
            <button
                className="Button"
                onClick={() => giveReceivingTime({ onSuccess: props.handleSuccess })}
            >
                Enter
            </button>
        </div>
    );
}
