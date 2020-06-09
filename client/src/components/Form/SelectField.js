import React from 'react'
import {connect} from "react-redux";

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                {textLabel}
            </label>
        );
    }
};

const optonTag = (optionArray) => optionArray.map((data, index) => {
    return <option key={index} value={index}>{data}</option>
});

const SelectField = ({
                         label = false,
                         textLabel = null,
                         id = null,
                         name,
                         optionArray,
                         value = "",
                         handleChange, cssChangeColorCountryMissingReducer
                     }) => {
    return (
        <div className="Inputs">
            {labelTag(label, textLabel, id)}
            <select
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                style={{color: `${cssChangeColorCountryMissingReducer}`}}
            >
                {optonTag(optionArray)}
            </select>
        </div>
    )
}

const mapStateToProps = state => {
    let {cssChangeColorCountryMissingReducer} = state;
    return {cssChangeColorCountryMissingReducer}
};

export default connect(
    mapStateToProps
)(SelectField);
