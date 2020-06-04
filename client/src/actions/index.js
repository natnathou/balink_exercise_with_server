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
    let {dictionaryReducer} = getState();
    dispatch({
        type: "CHANGE_LANGUAGE",
        payload: {dictionaryReducer, language}
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

// action to change the color of coutry list if the country missing
export const colorCountryMissing = (cssChange) => {
    return {
        type: "COUNTRY_MISSING",
        payload: cssChange
    }

};

export const updateStatueError = (errorName, stat) => {
    return {
        type: "ERR_STATUE_UPDATE",
        payload: {errorName,stat}
    }
};

//action to update error message with the right language
export const updateErrorMessageInInput = () => (dispatch,getState) => {
    let {valueInput,languageReducer, errorStatue} = getState();
    if (errorStatue.firstName){
        valueInput.firstName=languageReducer.nameError;
    }
    if (errorStatue.name){
        valueInput.name=languageReducer.nameError
    }
    if (errorStatue.email){
        valueInput.email=languageReducer.emailError;
    }
    if (errorStatue.phone) {
        valueInput.phone = languageReducer.phoneError;
    }
    dispatch({
        type: "UPDATE_ERROR_MESSAGE",
        payload: valueInput
    })
};