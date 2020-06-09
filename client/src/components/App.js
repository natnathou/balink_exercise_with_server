import React from "react";
import {connect} from "react-redux";
import {changeLanguage, updateInput, updateErrorMessageInInput} from "../actions"
import Steps from "./Step/Steps";
import Infos from "./Infos/Infos";
import Success from "./Success/success"
import "../Style/App.css"


class App extends React.Component {
    componentDidMount() {
        // language initialization
        this.props.changeLanguage("fr");
    }

    onChangeLanguage = async event => {

        await this.props.changeLanguage(event.target.value);
        this.props.updateErrorMessageInInput();
    };

    render() {
        return (
            <div className="App">
                <div className="langChoose">
                    <select onClick={this.onChangeLanguage}>
                        <option value="fr">FR</option>
                        <option value="en">EN</option>
                    </select>
                </div>
                <div className="AppDown">
                    <div>
                        <Steps/>
                    </div>
                    <div>
                        <Success/>
                        <Infos/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let {successReducer, valueInput, languageReducer, errorStatue} = state;
    return {successReducer, valueInput, languageReducer, errorStatue}
};
export default connect(
    mapStateToProps, {changeLanguage, updateInput, updateErrorMessageInInput}
)(App);


