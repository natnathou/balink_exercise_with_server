import {combineReducers} from "redux";
import lang from "../language/lang"

//desc: reducer, to to store our dictionary in our state and when we fetch list country from our server we update the dictionary

const dictionaryReducer = ( defaultLanguage = lang, action) => {
    switch (action.type) {
        case "UPDATE_DICTIONARY":
            let languageUpdated = {...defaultLanguage};
            languageUpdated.en.listCountry=action.payload.data.en;
            languageUpdated.fr.listCountry=action.payload.data.fr;
            return languageUpdated;
        default: return defaultLanguage;
    }
};

//desc: reducer, to save the actual language display, at initialisation default language is empty, so we will initialize it in componentDidMount of our APP
//we choice the option to save lang ../language/lang in jsonLanguageReducer, update it when we fetch country list. So languageReducer will render jsonLanguageReducer with the right language.
//We choose this option to simplify the integration of country list in our dictionary, and the user will switch language it will display the same country that he choose.
const languageReducer = ( defaultLanguage = {}, action) => {
    switch (action.type){
        case "CHANGE_LANGUAGE":
            return action.payload.dictionaryReducer[action.payload.language];
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

//desc: reducer, to save response of our get request to fetch the list of ours country
const countryReducer = (countryArray = [], action) => {
    switch (action.type) {
        case "GET_REQUEST":
            return (action.payload);
        default:
            return countryArray;
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
        country:0,
        email:"",
        phone: ""
    },
    action) => {
    let newObjectValue = {...value};
    if (action.type === "UPDATE_INPUT") {
        switch (action.payload.title) {
            case "gender":
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
    if (action.type === "UPDATE_ERROR_MESSAGE"){
        return {...action.payload}
    }
    return value;
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

const cssChangeColorCountryMissingReducer = (css="#5D6D7E", action) => {
    switch (action.type) {
        case "COUNTRY_MISSING":
            return (action.payload);
        default:
            return css;
    }
};

const errorStatue = (state={
    firstName:false,
    name:false,
    email: false,
    phone: false
}, action) => {
    let newState = state;
    switch (action.type) {
        case "ERR_STATUE_UPDATE":
            newState[action.payload.errorName]=action.payload.stat;
            return newState;
    }
    return state
};

export default combineReducers({
    dictionaryReducer,
    languageReducer,
    stepReducer,
    valueInput,
    countryReducer,
    successReducer,
    cssChangeColorCountryMissingReducer,
    errorStatue
})