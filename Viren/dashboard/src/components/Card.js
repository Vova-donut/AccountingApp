import React from "react";

const Card = ({ title, value, icon, onClick, interactive = false }) => {
  const className = interactive ? "card clickable" : "card";
  const props = onClick
    ? { onClick, role: "button", tabIndex: 0, onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && onClick(e) }
    : {};

  return (
    <div className={className} {...props}>
      <h3>{title}</h3>
      <div className="icon">{icon}</div>
      {value != null && <h2>{value}</h2>}
      <p>{title}</p>
    </div>
  );
};

export default Card;
