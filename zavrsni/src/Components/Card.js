import React from "react";
import cx from "classnames";

function Card({
  title,
  children,
  custom,
  interactive,
  link,
  className,
}) {
  const cardClassName = cx({
    "m-4 p-5 filter border border-2 rounded-lg": true,
    "drop-shadow-2xl bg-white": !custom,
    [className]: className,
  });

  if (interactive === true) {
    return (
      <a href={link} className="flex w-full">
        <div className={cardClassName}>
          {title && <div className="text-2xl mb-6">{title}</div>}
          {children}
        </div>
      </a>
    );
  } else {
    return (
      <div className={cardClassName}>
        {title && <div className="text-2xl mb-6">{title}</div>}
        {children}
      </div>
    );
  }
}

export default Card;
