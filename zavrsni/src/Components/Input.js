import React from "react";
import cx from "classnames";
import Field from "./Field";

export default function Input({
        label,
        name,
        type,
        placeholder,
        onChange,
        className = "",
        value,
        required,
        icon,
        disabled,
        onClick,
    }) {
    const InputStyle = cx({
        "flex flex-row border-2 rounded-sm mb-2 filter drop-shadow-md": true,
        "border-gray-400 hover:border-gray-600": !disabled,
        "border-gray-200": disabled,
        [className]: className,
    });

    const IconStyle = cx({
        "w-11 p-2": true,
        "bg-white": !disabled,
        "bg-gray-100": disabled,
    });

    return (
        <Field label={label} className={className}>
        {icon ? (
            <div className={InputStyle}>
                <div className={IconStyle}>{icon}</div>
                <input
                    className="p-2 w-full border-l-2"
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    required={required}
                    disabled={disabled}
                    onClick={onClick}
                />
            </div>
        ) : (
            <div className={InputStyle}>
                <input
                    className="p-2 w-full"
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    required={required}
                    disabled={disabled}
                    onClick={onClick}
                />
            </div>
        )}           
        </Field>
    );
}
