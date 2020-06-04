import React  from "react";
import {connect} from "react-redux";
import {updateInput,getRequestAction,checkValidityName,updateListCountryInDictionary,colorCountryMissing} from "../actions"
import "../Style/Form.css"

class AddressInfo extends React.Component{
    constructor(props) {
        super(props);
        this.refSelect = React.createRef();
        this.state= {updateListCountryCompleted:false};
    }
    componentDidMount() {
        // get request with axios to get the list of all country from our server
        this.getRequestAsyncAwait();

    }

    getRequestAsyncAwait = async () =>{
        await this.props.getRequestAction('country');
        if (this.props.countryReducer.response){
             this.props.updateListCountryInDictionary(this.props.countryReducer.response);
             this.setState({updateListCountryCompleted:true}); //we update the state to force the component to rerender itself
        }
    };

    // methode to display our country list
    selectRender= ()=> {
         return(
                <select
                    // initial value is 0, so we will test in another component if the user choose a country or not
                    value={this.props.valueInput.country}
                    ref={this.refSelect}
                    onChange={async (e) => {
                        // we update the value of valueInput with target value
                        await this.props.updateInput("country", e.target.value);
                        // we check with == and not === because at  initialisation valueInput.country is a number and after it's updated it change his type
                        if (this.props.valueInput.country == 0){
                            // if the user change his select for "no select" so we want to alert him
                            this.props.colorCountryMissing("#E74C3C");
                        } else {
                            // we remove the alert
                            this.props.colorCountryMissing("#5D6D7E");
                        }
                    }}
                    style={{color: `${this.props.cssChangeColorCountryMissingReducer}`}}
                >
                    {this.props.languageReducer.listCountry.map((data,index) => {
                        return (<option value={index} key={data}>{data}</option>)
                    })}
                </select>
            );
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
    let {languageReducer,valueInput,countryReducer,cssChangeColorCountryMissingReducer} = state;
    return {languageReducer,valueInput,countryReducer,cssChangeColorCountryMissingReducer}
};
export default connect(
    mapStateToProps, {updateInput,getRequestAction,checkValidityName,updateListCountryInDictionary,colorCountryMissing}
)(AddressInfo);
