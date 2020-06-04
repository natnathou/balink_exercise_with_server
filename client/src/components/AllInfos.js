import React  from "react";
import {connect} from "react-redux";
import PersonalInfo from "./PersonalInfo"
import AddressInfo from "./AddressInfo";
import ContactInfo from "./ContactInfo";
import {changeStep,updateInput,checkValidityName,checkValidityEmail,checkValidityPhone,checkValidity,postRequestAction,borderAlertCountryMissing} from "../actions"
import "../Style/Form.css"

class AllInfos extends React.Component{
    constructor(props) {
        super(props);
        this.refButtons = React.createRef();
        this.refForm = React.createRef();
    }

    componentDidMount() {
        this.refButtons.current.style.cssText = "justify-content: center;";
    }

    onPrev = () => {
        // we will test if witch step we are and we will update the new step in our reducer, and modify the display of our button
        switch (this.props.stepReducer.step) {
            case 2:
                this.props.changeStep(1);
                this.refButtons.current.style.cssText = "justify-content: center;";
                break;
            case 3:
                this.props.changeStep(2);
                this.refButtons.current.style.cssText = "justify-content: space-between;";
                break;
            default:
                return null
        }

    };
    onNext = () => {
        // we will test if witch step
        switch (this.props.stepReducer.step) {
            case 1:
                //test if firstName and Name are not empty
                if (!this.props.checkValidityName(this.props.valueInput.firstName).payload && !this.props.checkValidityName(this.props.valueInput.name).payload){
                    this.props.updateInput("firstName", this.props.languageReducer.nameError);
                    this.props.updateInput("name", this.props.languageReducer.nameError);
                } else if (!this.props.checkValidityName(this.props.valueInput.firstName).payload){
                    this.props.updateInput("firstName", this.props.languageReducer.nameError);
                } else if (!this.props.checkValidityName(this.props.valueInput.name).payload){
                    this.props.updateInput("name", this.props.languageReducer.nameError);
                }  else if (this.props.valueInput.firstName === this.props.languageReducer.nameError || this.props.valueInput.name === this.props.languageReducer.nameError) {
                    break;
                }  else {
                    this.props.changeStep(2);
                    this.refButtons.current.style.cssText = "justify-content: space-between;";
                }
                break;

            case 2:
                //test if country in not empty
                if (this.props.valueInput.country === ''){
                    this.props.borderAlertCountryMissing("1px solid #E74C3C");
                } else {
                    // we remove border color. (the border was to alert the client that he did not choose a country)
                    this.props.borderAlertCountryMissing("0px solid");
                    this.props.changeStep(3);
                    this.refButtons.current.style.cssText = "justify-content: space-between;";
                }
                break;
            default:
                return null
        }
    };

    onSend = async (event) => {
        event.preventDefault();
        //test if email and phone are in the right format
        if (this.props.checkValidityEmail(this.props.valueInput.email).payload && this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            // display success
            this.props.checkValidity(true);
            //Post Request, we receive just statue 200, "ok", in the response
            this.props.postRequestAction('user/new');
        } else if (!this.props.checkValidityEmail(this.props.valueInput.email).payload && !this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            this.props.updateInput("email", this.props.languageReducer.emailError);
            this.props.updateInput("phone", this.props.languageReducer.phoneError);
        } else if (!this.props.checkValidityEmail(this.props.valueInput.email).payload) {
            this.props.updateInput("email", this.props.languageReducer.emailError);
        } else if (!this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            this.props.updateInput("phone", this.props.languageReducer.phoneError);
        }
    };

    infoRender (){
        // ww display the right component in function of the step we are
        switch (this.props.stepReducer.step) {
            case 1:
                return <PersonalInfo/>;
            case 2:
                return <AddressInfo/>;
            case 3:
                return <ContactInfo/>;
            default:
                break;
        }
    }

    buttonRender (){
        // we display the right button (prev or next in function the step we are
        switch (this.props.stepReducer.step) {
            case 3:
                return (
                    <div className="Buttons" ref={this.refButtons}>
                        <div onClick={this.onPrev} style={{display: `${this.props.stepReducer.buttonPrevDisplay}`}}>{this.props.languageReducer.prev}</div>
                        <button onClick={this.onNext} style={{display: `${this.props.stepReducer.buttonNextDisplay}`}}>{this.props.languageReducer.send}</button>
                    </div>
                );
            default:
                return (
                    <div className="Buttons" ref={this.refButtons}>
                        <div onClick={this.onPrev} style={{display: `${this.props.stepReducer.buttonPrevDisplay}`}}>{this.props.languageReducer.prev}</div>
                        <div onClick={this.onNext} style={{display: `${this.props.stepReducer.buttonNextDisplay}`}}>{this.props.languageReducer.next}</div>
                    </div>
                );
        }
    }



    render(){
        return (
            <form className="Form" ref={this.refForm} onSubmit={this.onSend} style={{display: `${this.props.successReducer.displayApp}`}}>
                {this.infoRender()}
                {this.buttonRender()}
            </form>
        )
    }
}

const mapStateToProps = state => {
    let {languageReducer,stepReducer,valueInput,successReducer} = state;
    return {languageReducer,stepReducer,valueInput,successReducer}
};
export default connect(
    mapStateToProps,{changeStep,updateInput,checkValidityName,checkValidityEmail,checkValidityPhone,checkValidity,postRequestAction,borderAlertCountryMissing}
)(AllInfos);
