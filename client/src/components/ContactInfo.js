import React  from "react";
import {connect} from "react-redux";
import {updateInput} from "../actions"
import "../Style/Form.css"

class ContactInfo extends React.Component{

    render(){
        return (
            <div className="BlockInputAndCheckbox" style={{height: '100px'}}>
                <div className="Inputs">

                    <input
                        type="text"
                        placeholder={this.props.languageReducer.emailAddress}
                        value={this.props.valueInput.email}
                        onChange={async (e) => await this.props.updateInput("email", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={this.props.languageReducer.phoneNumber}
                        value={this.props.valueInput.phone}
                        onChange={async (e) => await this.props.updateInput("phone", e.target.value)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let {languageReducer,valueInput} = state;
    return {languageReducer,valueInput}
};
export default connect(
    mapStateToProps, {updateInput}
)(ContactInfo);
