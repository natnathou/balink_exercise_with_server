import React from "react";
import formField from "../Form/json/field";
import "../../Style/Steps.css"
import {connect} from "react-redux";

//Dynamics steps
class Steps extends React.Component {
    step = () => {
        const index           = Object.keys(formField);
        const displayHrBefore = (i) => {
            if (i === 3) {
                return <hr className="Hr"/>
            }
        };
        const displayHrAfter  = (i) => {
            if (i === 1) {
                return <hr className="Hr"/>
            }
        };
        return (index.map((data, index) => {
                if (parseInt(data) === this.props.stepReducer.step) {
                    return (
                        <div key={index}>
                            {displayHrBefore(parseInt(data))}
                            <div
                                className="Step"
                                style={{backgroundColor: '#303F9F'}}>
                                {this.props.languageReducer.step} {data}
                            </div>
                            {displayHrAfter(parseInt(data))}
                        </div>


                    )
                } else {
                    return (
                        <div key={index}>
                            {displayHrBefore(parseInt(data))}
                            <div className="Step">
                                {this.props.languageReducer.step} {data}
                            </div>
                            {displayHrAfter(parseInt(data))}
                        </div>
                    )
                }
            })
        )
    };

    render() {
        return (
            <div className="Steps">
                {this.step()}
            </div>

        )
    }
}

const mapStateToProps = state => {
    let {languageReducer, stepReducer} = state;
    return {languageReducer, stepReducer}
};
export default connect(
    mapStateToProps
)(Steps);