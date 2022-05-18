import React from "react";
import cx from "classnames";

export default function Button({
	label,
	onClick,
	type,
	className = "",
	color = "",
	icon,
}) {
  const finalClassName = cx({
    "flex flex-row items-center px-5 py-2 filter drop-shadow-sm rounded-md justify-center": true,
    "text-gray-900 text-lg border-2 border-gray-400": !className,
    "active:bg-cyan-500 hover:bg-cyan-600": !color,
    [color]: color,
    [className]: className,
  });

  return (
    <button
		type={type}
		className={finalClassName}
		onClick={onClick ?? (() => {})}
		>
		{!icon ? (
			label
		) : (
			<>
			<div className="w-6 pl-1">{icon}</div>
			<p>{label}</p>
			</>
		)}
    </button>
  );
}
