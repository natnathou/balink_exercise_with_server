import React from "react";
import {connect} from "react-redux";
import "../../Style/AllSteps.css"

const Step1 = (props) => {
    if (props.stepReducer.step === 1) {
        return (
            <div
                className="Step"
                style={{backgroundColor: '#303F9F'}}>
                {props.languageReducer.step} 1
            </div>
        )
    } else {
        return (
            <div className="Step">{props.languageReducer.step} 1</div>
        )
    }
};

const mapStateToProps = state => {
    let {languageReducer, stepReducer} = state;
    return {languageReducer, stepReducer}
};
export default connect(
    mapStateToProps
)(Step1);