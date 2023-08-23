import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { orderAbi } from "../constants";
import "./button.css"

export default function ShippingTimeButton(props) {
    const [giveMoreTime, setGiveMoreTime] = useState(false);
    const [timeToShip, setTimeToShip] = useState();

    const changeGiveMoreTime = () => {
        setGiveMoreTime(!giveMoreTime);
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
                <label className="Button-label">Give More Time? </label>
                <label className="container"> Yes
                    <input className="checkbox" type="checkbox" checked={giveMoreTime} onChange={changeGiveMoreTime} /> <span className="checkmark"></span>
                </label> 
                <label className="container"> No
                    <input className="checkbox" type="checkbox"  checked={!giveMoreTime}onChange={changeGiveMoreTime} /> <span className="checkmark"></span>
                </label> 
            </div>
            {giveMoreTime ?
                <div>
                    <label className="Button-label">Time to Ship: </label>
                    <input className="input" onChange={changeTimeToShip} /> <br />
                </div> 
                : false
            }
            <button className="Button" onClick={() => giveShippingTime({ onSuccess: props.handleSuccess })}>
                Enter
            </button>
        </div>
    );
}
