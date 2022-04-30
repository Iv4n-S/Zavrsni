import React from "react";
import cx from "classnames";
import Field from "./Field";

export default function Input({
  label,
  name,
  type,
  placeholder,
  textArea,
  onChange,
  className = "",
  value,
  required,
  icon,
  disabled,
}) {
  const InputStyle = cx({
    "flex flex-row border-2 rounded-sm mb-2 filter drop-shadow-md": true,
    "px-2 py-2": !icon,
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
        textArea ? (
          <div className={InputStyle}>
            <div className={IconStyle}>{icon}</div>
            <textarea
              className="p-2 pb-8 w-full border-l-2"
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              required={required}
              disabled={disabled}
            />
          </div>
        ) : (
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
            />
          </div>
        )
      ) : textArea ? (
        <textarea
          className={InputStyle}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          className={InputStyle}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
        />
      )}
    </Field>
  );
}
