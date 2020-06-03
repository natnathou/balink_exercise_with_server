import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "../../Style/AllSteps.css"

const AllSteps = () => {
    return (
        <div className="AllSteps">
            <Step1/>
            <hr className="Hr"/>
            <Step2/>
            <hr className="Hr"/>
            <Step3/>
        </div>
    )
};

export default AllSteps;
