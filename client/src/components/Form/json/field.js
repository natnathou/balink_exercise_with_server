const formField = {
    1: [
        {
            type       : "radio",
            label      : true,
            textLabel  : "Mr",
            id         : "checkedMr",
            required   : false,
            name       : "gender",
            placeholder: "",
            value      : "Mr"
        },
        {
            type       : "radio",
            label      : true,
            textLabel  : "Mrs",
            id         : "checkedMrs",
            required   : false,
            name       : "gender",
            placeholder: "",
            value      : "Mrs",
        },
        {
            type       : "text",
            label      : false,
            textLabel  : null,
            id         : "firstName",
            required   : false,
            name       : "firstName",
            placeholder: "firstName",
            value      : "",
        },
        {
            type       : "text",
            label      : false,
            textLabel  : null,
            id         : "name",
            required   : false,
            name       : "name",
            placeholder: "Name",
            value      : "",
        }
    ],
    2: [
        {
            type       : "text",
            label      : false,
            textLabel  : "",
            id         : "street",
            required   : false,
            name       : "street",
            placeholder: "",
            value      : ""
        },
        {
            type       : "text",
            label      : false,
            textLabel  : "",
            id         : "city",
            required   : false,
            name       : "city",
            placeholder: "",
            value      : ""
        },
        {
            type       : "list",
            label      : false,
            textLabel  : "",
            id         : "country",
            name       : "country",
            optionArray: []
        }
    ],
    3: [
        {
            type       : "text",
            label      : false,
            textLabel  : "",
            id         : "email",
            required   : false,
            name       : "emailAddress",
            placeholder: "",
            value      : ""
        },
        {
            type       : "text",
            label      : false,
            textLabel  : "",
            id         : "phone",
            required   : false,
            name       : "phoneNumber",
            placeholder: "",
            value      : ""
        }
    ]
};
export default formField;