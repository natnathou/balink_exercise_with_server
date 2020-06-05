import React from "react";
import {connect} from "react-redux";
import "../../Style/AllSteps.css"

const Step3 = (props) => {
    if (props.stepReducer.step === 3) {
        return (
            <div
                className="Step"
                style={{backgroundColor: '#303F9F'}}>
                {props.languageReducer.step} 3
            </div>
        )
    } else {
        return (
            <div className="Step">{props.languageReducer.step} 3</div>
        )
    }
};

const mapStateToProps = state => {
    let {languageReducer, stepReducer} = state;
    return {languageReducer, stepReducer}
};

export default connect(
    mapStateToProps
)(Step3);