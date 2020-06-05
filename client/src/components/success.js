import React from "react";
import {connect} from "react-redux";


const Success = (props) => {
    return <div style={{
        display  : `${props.successReducer.displaySuccess}`,
        marginTop: '75px'
    }}>{props.languageReducer.success}!!!</div>
};

const mapStateToProps = state => {
    let {languageReducer, successReducer} = state;
    return {languageReducer, successReducer}
};
export default connect(
    mapStateToProps
)(Success);
