import React from "react";
import {connect} from "react-redux";
import "../../Style/AllSteps.css"

const Step2 = (props) => {
    if (props.stepReducer.step === 2) {
        return (
            <div
                className="Step"
                style={{backgroundColor: '#303F9F'}}>
                {props.languageReducer.step} 2
            </div>
        )
    } else {
        return (
            <div className="Step">{props.languageReducer.step} 2</div>
        )
    }
};

const mapStateToProps = state => {
    let {languageReducer, stepReducer} = state;
    return {languageReducer, stepReducer}
};
export default connect(
    mapStateToProps
)(Step2);