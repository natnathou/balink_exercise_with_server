import React from "react";
import {connect} from "react-redux";
import Form from "./Form/Form";
import {
    changeStep,
    updateInput,
    checkValidityName,
    checkValidityEmail,
    checkValidityPhone,
    checkValidity,
    postRequestAction,
    colorCountryMissing,
    updateStatueError
} from "../actions"
import "../Style/Form.css"

class AllInfos extends React.Component {
    constructor(props) {
        super(props);
        this.refButtons = React.createRef();
        this.refForm    = React.createRef();
    }

    componentDidMount() {
        this.refButtons.current.style.cssText = "justify-content: center;";
    }

    onPrev = () => {
        // we will test in wich step we are and we will update the new step in our reducer, and modify the display of our button
        switch (this.props.stepReducer.step) {
            case 2:
                //we change the step
                this.props.changeStep(1);
                this.refButtons.current.style.cssText = "justify-content: center;";
                break;
            case 3:
                //we change the step
                this.props.changeStep(2);
                this.refButtons.current.style.cssText = "justify-content: space-between;";
                break;
            default:
                return null
        }

    };
    onNext = () => {
        //error statue initialization
        this.props.updateStatueError("firstName", false);
        this.props.updateStatueError("name", false);
        // we will test in which step we are
        switch (this.props.stepReducer.step) {
            case 1:
                //test if firstName and Name are not empty
                if (!this.props.checkValidityName(this.props.valueInput.firstName).payload && !this.props.checkValidityName(this.props.valueInput.name).payload) {
                    //update error statue
                    this.props.updateStatueError("firstName", true);
                    //update error statue
                    this.props.updateStatueError("name", true);
                    this.props.updateInput("firstName", this.props.languageReducer.nameError);
                    this.props.updateInput("name", this.props.languageReducer.nameError);
                } else if (!this.props.checkValidityName(this.props.valueInput.firstName).payload) {
                    //update error statue
                    this.props.updateStatueError("firstName", true);
                    this.props.updateInput("firstName", this.props.languageReducer.nameError);
                } else if (!this.props.checkValidityName(this.props.valueInput.name).payload) {
                    //update error statue
                    this.props.updateStatueError("name", true);
                    this.props.updateInput("name", this.props.languageReducer.nameError);
                } else if (this.props.valueInput.firstName === this.props.languageReducer.nameError || this.props.valueInput.name === this.props.languageReducer.nameError) {
                    break;
                } else {
                    //update error statue
                    this.props.updateStatueError("firstName", false);
                    //update error statue
                    this.props.updateStatueError("name", false);
                    //we change the step
                    this.props.changeStep(2);
                    this.refButtons.current.style.cssText = "justify-content: space-between;";
                }
                break;

            case 2:
                //test if country in not empty
                if (parseInt(this.props.valueInput.country) === 0) {
                    // if the user change his select for "no select" so we want to alert him
                    this.props.colorCountryMissing("#E74C3C");
                } else {
                    // we remove the alert
                    this.props.colorCountryMissing("#5D6D7E");
                    //we change the step
                    this.props.changeStep(3);
                    this.refButtons.current.style.cssText = "justify-content: space-between;";
                }
                break;
            default:
                return null
        }
    };

    onSend = async (event) => {
        //error statue initialization
        this.props.updateStatueError("email", false);
        this.props.updateStatueError("phone", false);
        event.preventDefault();
        //test if email and phone are in the right format
        if (this.props.checkValidityEmail(this.props.valueInput.email).payload && this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            //update error statue
            this.props.updateStatueError("email", false);
            //update error statue
            this.props.updateStatueError("phone", false);
            // display success
            this.props.checkValidity(true);
            //Post Request, we receive just statue 200, "ok", in the response
            this.props.postRequestAction('user/new');
        } else if (!this.props.checkValidityEmail(this.props.valueInput.email).payload && !this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            //update error statue
            this.props.updateStatueError("email", true);
            //update error statue
            this.props.updateStatueError("phone", true);
            this.props.updateInput("email", this.props.languageReducer.emailError);
            this.props.updateInput("phone", this.props.languageReducer.phoneError);
        } else if (!this.props.checkValidityEmail(this.props.valueInput.email).payload) {
            //update error statue
            this.props.updateStatueError("email", true);
            this.props.updateInput("email", this.props.languageReducer.emailError);
        } else if (!this.props.checkValidityPhone(this.props.valueInput.phone).payload) {
            //update error statue
            this.props.updateStatueError("phone", true);
            this.props.updateInput("phone", this.props.languageReducer.phoneError);
        }
    };


    buttonRender() {
        // we display the right button (prev or next in function the step we are
        switch (this.props.stepReducer.step) {
            case 3:
                return (
                    <div className="Buttons" ref={this.refButtons}>
                        <div onClick={this.onPrev}
                             style={{display: `${this.props.stepReducer.buttonPrevDisplay}`}}>{this.props.languageReducer.prev}</div>
                        <button onClick={this.onNext}
                                style={{display: `${this.props.stepReducer.buttonNextDisplay}`}}>{this.props.languageReducer.send}</button>
                    </div>
                );
            default:
                return (
                    <div className="Buttons" ref={this.refButtons}>
                        <div onClick={this.onPrev}
                             style={{display: `${this.props.stepReducer.buttonPrevDisplay}`}}>{this.props.languageReducer.prev}</div>
                        <div onClick={this.onNext}
                             style={{display: `${this.props.stepReducer.buttonNextDisplay}`}}>{this.props.languageReducer.next}</div>
                    </div>
                );
        }
    }

    render() {
        return (
            <form className="Form" ref={this.refForm} onSubmit={this.onSend}
                  style={{display: `${this.props.successReducer.displayApp}`}}>
                <Form/>
                {this.buttonRender()}
            </form>
        )
    }
}

const mapStateToProps = state => {
    let {languageReducer, stepReducer, valueInput, successReducer, errorStatue} = state;
    return {languageReducer, stepReducer, valueInput, successReducer, errorStatue}
};
export default connect(
    mapStateToProps, {
        changeStep,
        updateInput,
        checkValidityName,
        checkValidityEmail,
        checkValidityPhone,
        checkValidity,
        postRequestAction,
        colorCountryMissing,
        updateStatueError
    }
)(AllInfos);
