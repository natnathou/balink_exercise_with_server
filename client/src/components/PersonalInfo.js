import React  from "react";
import {connect} from "react-redux";
import {updateInput} from "../actions"
import "../Style/Form.css"

class PersonalInfo extends React.Component{

    render(){
        return (
            <div className="BlockInputAndCheckbox" style={{height: '150px'}}>
                <div className="Checkbox">
                    <div>
                        <label htmlFor="Mr">{this.props.languageReducer.mr}</label>
                        <input
                            type="radio"
                            name="gender"
                            id="Mr"
                            value="Mr"
                            checked={this.props.valueInput.gender.checkedMr}
                            onChange={async (e) => await this.props.updateInput("gender", e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Mr">{this.props.languageReducer.mrs}</label>
                        <input
                            type="radio"
                            name="gender"
                            id="Mrs"
                            value="Mrs"
                            checked={this.props.valueInput.gender.checkedMrs}
                            onChange={async (e) => await this.props.updateInput("gender", e.target.value)}
                        />
                    </div>
                </div>
                <div className="Inputs" style={{marginTop: '15px'}}>
                    <input
                        type="text"
                        placeholder={this.props.languageReducer.firstName}
                        value={this.props.valueInput.firstName}
                        onChange={async (e) => await this.props.updateInput("firstName", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={this.props.languageReducer.name}
                        value={this.props.valueInput.name}
                        onChange={async (e) => await this.props.updateInput("name", e.target.value)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let {languageReducer,stepReducer,valueInput} = state;
    return {languageReducer,stepReducer,valueInput}
};
export default connect(
    mapStateToProps, {updateInput}
)(PersonalInfo);
