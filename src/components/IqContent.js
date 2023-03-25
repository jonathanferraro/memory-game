import React from "react";
import { iqLevels } from "../data/iq-levels";

export default function IqContent({score}) {
    const iqObj = iqLevels[score];

    if (score < 1) {
        return <div></div>
    }


    return (
        <div>
            { (score > 1 || score < 10) ?
            (<div>
            <h3>Your IQ is {iqObj.iq}</h3>
            <h4>You have an IQ of {iqObj.name}</h4>
            <img className="iq-image" src={iqObj.image}/>
            </div>) :
            (<div>
                <h3>Your IQ is {iqLevels[9].iq}</h3>
                <h4>You have an IQ of {iqLevels[9].name}</h4>
                <img className="iq-image" src={iqLevels[9].image}/>
            </div>)
            }

        </div>
    )
}