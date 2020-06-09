import React from "react";

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                {textLabel}
            </label>
        );
    }
}

const RadioField = ({
                        label = false,
                        textLabel = "",
                        type="",
                        id = "",
                        required = false,
                        name = "",
                        placeholder = "",
                        value = "",
                        handleChange =null,
                        checked=false

                    }) => {

    return (
        <div className="Checkbox">
            {labelTag(label, textLabel, id)}
            <input
                type={type}
                id={id}
                required={required}
                name={name}
                placeholder={placeholder}
                value={value}
                checked={checked}
                onChange={handleChange}
            />
        </div>

    )

}


export default RadioField
