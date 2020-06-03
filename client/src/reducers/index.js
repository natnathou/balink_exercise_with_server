import {combineReducers} from "redux";
import lang from "../language/lang"

//desc: reducer, to save the actual language display
const languageReducer = ( defaultLanguage = lang.fr, action) => {
    switch (action.type){
        case "CHANGE_LANGUAGE":
            return lang[action.payload];
        default:
            return defaultLanguage;
    }
};

//desc: reducer, to save the actual step
const stepReducer = (stepDisplay= {
    step: 1,
    buttonPrevDisplay: 'none',
    buttonNextDisplay: 'block',
}, action) =>{
    switch (action.type) {
        case "CHANGE_STEP":
            return action.payload;
        default:
            return stepDisplay
    }
};

//desc: reducer, to save all our input to switch to a controlled component
const valueInput = (
    value = {
        gender:{value:"", checkedMr: false, checkedMrs: false},
        firstName: "",
        name:"",
        street:"",
        city:"",
        country:"",
        email:"",
        phone: ""
    },
    action) => {
    if (action.type === "UPDATE_INPUT") {
        switch (action.payload.title) {
            case "gender":
                let newObjectValue = {...value};
                newObjectValue.gender.value=action.payload.value;
                if (action.payload.value === "Mr"){
                    newObjectValue.gender.checkedMr = true;
                    newObjectValue.gender.checkedMrs = false;
                } else if (action.payload.value === "Mrs"){
                    newObjectValue.gender.checkedMr = false;
                    newObjectValue.gender.checkedMrs = true;
                }
                return newObjectValue;
            case "firstName":
                return {...value, firstName:action.payload.value};
            case "name":
                return {...value, name:action.payload.value};
            case "street":
                return {...value, street:action.payload.value};
            case "city":
                return {...value, city:action.payload.value};
            case "country":
                return {...value, country:action.payload.value};
            case "email":
                return {...value, email:action.payload.value};
            case "phone":
                return {...value, phone:action.payload.value};
            default:
                return {...value};
        }
    }
    return value;
};

//desc: reducer, to save response of our get request to fetch the list of ours country
const countryReducer = (countryArray = [], action) => {
    switch (action.type) {
        case "GET_REQUEST":
            return (action.payload);
        default:
            return countryArray;
    }
};

//desc: reducer, to save statue in our state if all steps are an success
const successReducer = (state={
    displayApp: "flex",
    displaySuccess: "none"
}, action) => {
    switch (action.type) {
        case "CHECK_SUCCESS":
            return (action.payload);
        default:
            return state;
    }
};

const cssChangeBorderAlertCountryMissingReducer = (css="0px solid", action) => {
    switch (action.type) {
        case "BORDER_ALERT_COUNTRY_MISSING":
            return (action.payload);
        default:
            return css;
    }
};

export default combineReducers({
    languageReducer,
    stepReducer,
    valueInput,
    countryReducer,
    successReducer,
    cssChangeBorderAlertCountryMissingReducer
})