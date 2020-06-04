import request from "../api/api";

// desc: action to update country list in our dictionary
export const updateListCountryInDictionary = (objectToUpdate) => {
    return {
        type: "UPDATE_DICTIONARY",
        payload: objectToUpdate
    }
};

// desc: action to change the display language
export const changeLanguage = (language) => async (dispatch,getState) => {
    let {jsonLanguageReducer} = getState();
    dispatch({
        type: "CHANGE_LANGUAGE",
        payload: {jsonLanguageReducer, language}
    })
};


//desc: action to change the step
export const changeStep = (stepNumber) =>{
    let obj = {
        step: stepNumber,
    };
    switch (stepNumber) {
        case 1:
            obj.buttonPrevDisplay='none';
            obj.buttonNextDisplay='block';
            break;
        case 2:
            obj.buttonPrevDisplay='block';
            obj.buttonNextDisplay='block';
            break;
        case 3:
            obj.buttonPrevDisplay='block';
            obj.buttonNextDisplay='block';
            break;
        default:
            break;
    }
    return {
        type: "CHANGE_STEP",
        payload: obj
    }
};

//desc: action to update all input in our reducer
export const updateInput = (title, value) => {
    return {
        type: "UPDATE_INPUT",
        payload: {title, value}
    }
};

//desc: action to check if an input is not empty
export const checkValidityName = (names = null) =>{
    if(names === ""){
        return {
            type: "CHECK_VALIDITY_NAME",
            payload: false
        }
    } else{
        return {
            type: "CHECK_VALIDITY_NAME",
            payload: true
        }
    }

};


//desc: action to check email format validity
export const checkValidityEmail = (emailAddress=null) =>{
    let testReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        type: "CHECK_VALIDITY_EMAIL",
        payload: testReg.test(emailAddress)
    }
};

export const checkValidityPhone = (phoneNumber) =>{
    let testReg = /[0-9]{10}/;
    return {
        type: "CHECK_VALIDITY_PHONE",
        payload: testReg.test(phoneNumber)
    }
};


//desc: action to check if all steps are an success
export const checkValidity = (statue= false) => {
    if(statue){
        return {
            type: "CHECK_SUCCESS",
            payload: {
                displayApp: "none",
                displaySuccess: "block"
            }
        }
    } else {
            return {
                type: "CHECK_SUCCESS",
                payload: {
                    displayApp: "flex",
                    displaySuccess: "none"
                }
        }
    }
};

export const postRequestAction = url => async dispatch => {
    let response = [], error = "";
    try {
        response = await request.post(`${url}`);
        console.log(response);
    } catch (e) {
        error = e;
    }
    dispatch({
        type   : 'POST_REQUEST',
        payload: {
            response: response,
            error   : error
        }
    });
};

export const getRequestAction = url => async dispatch => {
    let response = [], error = "";
    try {
        response = await request.get(`${url}`);
    } catch (e) {
        error = e;
    }
    dispatch({
        type   : 'GET_REQUEST',
        payload: {
            response: response,
            error   : error
        }
    });
};


export const borderAlertCountryMissing = (cssChange) => {
    return {
        type: "BORDER_ALERT_COUNTRY_MISSING",
        payload: cssChange
    }

};