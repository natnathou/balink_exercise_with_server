import React from "react";
import {connect} from "react-redux";
import formField from "../Form/json/field";
import InputTextField from "./InputTextField";
import SelectField from './SelectField';
import RadioField from "./RadioField";
import {
    colorCountryMissing,
    getRequestAction,
    updateInput,
    updateListCountryInDictionary
} from "../../actions";


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {updateListCountryCompleted: false};
    }

    componentDidMount() {
        // get request to get the list of all country from our server
        this.getRequestAsyncAwait();

    }

    getRequestAsyncAwait = async () => {
        await this.props.getRequestAction('country');
        if (this.props.countryReducer) {
            this.props.updateListCountryInDictionary(this.props.countryReducer);
            this.setState({updateListCountryCompleted: true}); //we update the state to force the component to rerender itself
        }
    };

    // Dynamic form
    renderInput = json => json.map((data, index) => {
        switch (data.type) {
            case "text":
                return (
                    <InputTextField
                        key={index}
                        label={data.label}
                        textLabel={data.textLabel}
                        type={data.type}
                        id={data.id}
                        required={data.required}
                        name={data.name}
                        placeholder={this.props.languageReducer[data.name]}
                        value={this.props.valueInput[data.id]}
                        handleChange={async (e) => await this.props.updateInput(data.id, e.target.value)}
                    />
                );
            case "list":
                return (
                    <SelectField
                        key={index}
                        label={data.label}
                        textLabel={data.textLabel}
                        id={data.id}
                        optionArray={this.props.languageReducer.listCountry}
                        value={this.props.valueInput[data.name]}
                        handleChange={async e => {
                            await this.props.updateInput("country", e.target.value);
                            if (parseInt(this.props.valueInput.country) === 0) {
                                // if the user change his select for "no select" so we want to alert him
                                this.props.colorCountryMissing("#E74C3C");
                            } else {
                                // we remove the alert
                                this.props.colorCountryMissing("#5D6D7E");
                            }
                        }}

                    />
                );
            case "radio":
                return (
                    <RadioField
                        key={index}
                        label={data.label}
                        textLabel={this.props.languageReducer[data.value]}
                        type={data.type}
                        id={data.id}
                        required={data.required}
                        name={data.name}
                        placeholder={this.props.languageReducer[data.name]}
                        value={this.props.valueInput[data.name]}
                        checked={this.props.valueInput.gender[data.id]}
                        handleChange={async (e) => await this.props.updateInput("gender", data.value)}
                    />
                );
            default:
                return <div></div>
        }
    });


    render() {
        return <div className="BlockInputAndCheckbox"
                    style={{height: '200px'}}>{this.renderInput(formField[this.props.stepReducer.step])}</div>

    }

}

const mapStateToProps = state => {
    let {languageReducer, stepReducer, valueInput, countryReducer} = state;
    return {
        languageReducer,
        stepReducer,
        valueInput,
        countryReducer
    }
};
export default connect(
    mapStateToProps, {
        updateInput,
        colorCountryMissing,
        getRequestAction,
        updateListCountryInDictionary
    }
)(Form);
