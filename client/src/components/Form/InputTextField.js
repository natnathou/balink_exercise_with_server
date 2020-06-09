import React from "react";

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                {textLabel}
            </label>
        );
    }
};

const InputTextField = ({
                            label = false,
                            textLabel = "",
                            type ="",
                            id = "",
                            required = false,
                            name = "",
                            placeholder = "",
                            value = "",
                            handleChange=null

                        }) => {

    return (
        <div className="Inputs" style={{marginBottom: '15px'}}>
            {labelTag(label, textLabel, id)}
            <input
                type={type}
                id={id}
                required={required}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>

    )

}


export default InputTextField
