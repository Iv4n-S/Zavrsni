import React from "react";
import cx from "classnames";

export default function Field({ label, children, className }) {
  const finalClassName = cx({
    "flex flex-col justify-start": true,
    "w-full": !className,
    [className]: className,
  });

  return (
    <div className={finalClassName}>
      <p className="mb-1">{label}</p>
      {children}
    </div>
  );
}
