import React  from "react";
import {connect} from "react-redux";
import {updateInput,getRequestAction,checkValidityName} from "../actions"
import "../Style/Form.css"

class AddressInfo extends React.Component{
    constructor(props) {
        super(props);
        this.refSelect = React.createRef();
    }
    componentDidMount() {
        // get request with axios to get the list of all country from our server
        this.props.getRequestAction('country');
    }

    listCountry = () => {
        //we check the response of our get request, we display an empty div if the request is empty, if not we display country list
        if (this.props.countryReducer.response){
            switch (this.props.languageReducer.lang) {
                case "en":
                    return (
                        this.props.countryReducer.response.data.en.map( data =>{
                            let values;
                            if (data==="State"){
                                values ="";
                            } else {
                                values = data
                            }
                            return <option value={values} key={data}>{data}</option>

                    }));
                case "fr":
                    return (
                        this.props.countryReducer.response.data.fr.map( data =>{
                            let values;
                            if (data==="Pays"){
                                values ="";
                            } else {
                                values = data
                            }
                            return <option value={values} key={data}>{data}</option>
                        }));
                default:
                    break;
            }
        } else {
            return <div></div>
        }
    };

    //To avoid error in first compile, because at the initialisation, country list is not already fetched so, to avoid display div tag in select tag,  in place of option tag in select tag,
    // we create the method below, to display div tag in place of selected if the list is not already fetched
    selectRender= ()=> {
        if(this.props.countryReducer.response){
            return(
                <select
                    value={this.props.valueInput.country}
                    ref={this.refSelect}
                    onChange={async (e) => {
                        await this.props.updateInput("country", e.target.value);

                    }}
                    style={{border: `${this.props.cssChangeBorderAlertCountryMissingReducer}`}}
                >
                    {this.listCountry()}
                </select>
            );
        } else {
            return <div></div>
        }
    };

    render(){
        return (
            <div className="BlockInputAndCheckbox">
                <div className="Inputs">
                    <input
                        type="text"
                        placeholder={this.props.languageReducer.street}
                        value={this.props.valueInput.street}
                        onChange={async (e) => await this.props.updateInput("street", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={this.props.languageReducer.city}
                        value={this.props.valueInput.city}
                        onChange={async (e) => await this.props.updateInput("city", e.target.value)}
                    />
                    {this.selectRender()}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let {languageReducer,valueInput,countryReducer,cssChangeBorderAlertCountryMissingReducer} = state;
    return {languageReducer,valueInput,countryReducer,cssChangeBorderAlertCountryMissingReducer}
};
export default connect(
    mapStateToProps, {updateInput,getRequestAction,checkValidityName}
)(AddressInfo);
